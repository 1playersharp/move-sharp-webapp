import { notFound } from "next/navigation";
import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
import { requireManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ageBandFromDOB, ageInYears } from "@/lib/age-band";
import { POSITIONS } from "@/lib/constants/positions";
import { PB_METRICS, pbMetricByKey, formatMetricValue } from "@/lib/constants/pb-metrics";

const BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-15",
  U16_U18: "U16-18",
};

type ConsentShape = {
  sessionsVisible?: boolean;
  readinessVisible?: boolean;
  pbsVisible?: boolean;
};

type Props = {
  params: Promise<{ id: string; playerId: string }>;
};

export default async function CoachPlayerViewPage({ params }: Props) {
  const user = await requireManager();
  const { id: teamId, playerId } = await params;

  // Manager must own the team; player must be a member. Look up
  // both in one query so a crafted teamId or playerId can't leak
  // data from another team.
  const membership = await prisma.teamMembership.findFirst({
    where: {
      role: "player",
      teamId,
      team: { createdByUserId: user.id },
      user: { player: { id: playerId } },
    },
    include: {
      team: { select: { id: true, name: true } },
      user: {
        select: {
          player: {
            select: {
              id: true,
              name: true,
              dateOfBirth: true,
              position: true,
              club: true,
            },
          },
        },
      },
    },
  });

  if (!membership || !membership.user.player) notFound();

  const p = membership.user.player;
  const consent = (membership.consent ?? {}) as ConsentShape;
  const positionLabel = p.position
    ? POSITIONS.find((x) => x.key === p.position)?.label
    : null;
  const band = BAND_LABEL[ageBandFromDOB(p.dateOfBirth)];
  const age = ageInYears(p.dateOfBirth);

  // Consented data — only queried when the flag is set. If the flag
  // is off we render a "Not shared" placeholder and never touch the
  // underlying tables.
  const [sessions, readiness, entries, metrics] = await Promise.all([
    consent.sessionsVisible
      ? prisma.session.findMany({
          where: { playerId: p.id, completedAt: { not: null } },
          orderBy: { completedAt: "desc" },
          take: 10,
          include: { sessionTemplate: { select: { name: true } } },
        })
      : Promise.resolve([]),
    consent.readinessVisible
      ? prisma.readinessEntry.findMany({
          where: { playerId: p.id },
          orderBy: { recordedOn: "desc" },
          take: 10,
        })
      : Promise.resolve([]),
    consent.pbsVisible
      ? prisma.metricEntry.findMany({
          where: { playerId: p.id, isPersonalBest: true },
          orderBy: { recordedAt: "desc" },
        })
      : Promise.resolve([]),
    consent.pbsVisible
      ? prisma.metric.findMany({ where: { playerId: p.id } })
      : Promise.resolve([]),
  ]);

  const metricByKey = new Map(metrics.map((m) => [m.id, m] as const));
  const bestByKey = new Map<string, (typeof entries)[number]>();
  for (const e of entries) {
    const key = metricByKey.get(e.metricId)?.key;
    if (key && !bestByKey.has(key)) bestByKey.set(key, e);
  }

  return (
    <CoachShell>
      <Header
        back={{ href: `/coach/teams/${teamId}`, label: `${membership.team.name} roster` }}
        title={p.name}
        subtitle={[band, positionLabel, `Age ${age}`, p.club].filter(Boolean).join(" · ")}
      />

      <div className="space-y-5 shell-gutter pb-6">
        {/* Sessions */}
        <ConsentSection
          heading="Sessions"
          shared={Boolean(consent.sessionsVisible)}
        >
          {sessions.length === 0 ? (
            <EmptyLine text="No completed sessions logged yet." />
          ) : (
            <ul className="divide-y divide-white/5">
              {sessions.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between py-2">
                  <span className="text-sm text-white">
                    {s.sessionTemplate?.name ?? "Session"}
                  </span>
                  <span className="text-[0.7rem] tabular-nums text-muted">
                    {s.completedAt?.toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ConsentSection>

        {/* Readiness */}
        <ConsentSection
          heading="Readiness"
          shared={Boolean(consent.readinessVisible)}
        >
          {readiness.length === 0 ? (
            <EmptyLine text="No readiness check-ins yet." />
          ) : (
            <ul className="divide-y divide-white/5">
              {readiness.map((r) => (
                <li key={r.id} className="flex items-baseline justify-between py-2">
                  <span className="text-sm text-white tabular-nums">
                    Energy {r.energy} · Sleep {r.sleep} · Soreness {r.soreness}
                  </span>
                  <span className="text-[0.7rem] tabular-nums text-muted">
                    {r.recordedOn.toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ConsentSection>

        {/* Personal bests */}
        <ConsentSection
          heading="Personal bests"
          shared={Boolean(consent.pbsVisible)}
        >
          {bestByKey.size === 0 ? (
            <EmptyLine text="No PBs logged yet." />
          ) : (
            <ul className="divide-y divide-white/5">
              {PB_METRICS.map((def) => {
                const best = bestByKey.get(def.key);
                if (!best) return null;
                return (
                  <li key={def.key} className="flex items-baseline justify-between py-2">
                    <span className="text-sm text-white">{def.label}</span>
                    <span className="font-display uppercase tracking-display text-muted-strong text-sm tabular-nums">
                      {formatMetricValue(best.value, def.unit)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </ConsentSection>

        <div className="rounded-md border border-white/10 bg-ink-900/40 p-4 text-[0.7rem] text-muted-strong">
          You only see fields {p.name} has opted in to share. Sections
          marked "Not shared" render nothing — no query hits the
          database for them.
        </div>
      </div>
    </CoachShell>
  );
}

function ConsentSection({
  heading,
  shared,
  children,
}: {
  heading: string;
  shared: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-card border border-white/5 bg-ink-850 shadow-card">
      <div className="flex items-baseline justify-between border-b border-white/5 px-5 py-3">
        <h2 className="font-display uppercase tracking-display text-white text-base">
          {heading}
        </h2>
        {shared ? (
          <span className="font-display uppercase tracking-display text-[0.6rem] text-brand-400">
            Shared
          </span>
        ) : (
          <span className="font-display uppercase tracking-display text-[0.6rem] text-muted">
            Not shared
          </span>
        )}
      </div>
      <div className="shell-gutter py-3">
        {shared ? children : (
          <p className="py-2 text-xs text-muted-strong">
            The player hasn't turned this on. Ask them if you need
            visibility for the block you're planning.
          </p>
        )}
      </div>
    </section>
  );
}

function EmptyLine({ text }: { text: string }) {
  return <p className="py-2 text-xs text-muted-strong">{text}</p>;
}
