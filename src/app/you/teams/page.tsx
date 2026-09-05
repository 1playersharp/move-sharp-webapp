import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateMembershipConsent, leaveTeam } from "@/app/actions/team";

type ConsentShape = {
  sessionsVisible?: boolean;
  readinessVisible?: boolean;
  pbsVisible?: boolean;
};

const CONSENT_FIELDS: Array<{
  key: "sessionsVisible" | "readinessVisible" | "pbsVisible";
  label: string;
  body: string;
}> = [
  {
    key: "sessionsVisible",
    label: "Sessions",
    body: "Which sessions you've logged and when. Not the drill-by-drill detail.",
  },
  {
    key: "readinessVisible",
    label: "Readiness",
    body: "Your daily energy, sleep and soreness check-ins (1–5 scale).",
  },
  {
    key: "pbsVisible",
    label: "Personal bests",
    body: "Your current best on each tested metric. Not the full history.",
  },
];

type Props = {
  searchParams: Promise<{ saved?: string; joined?: string; left?: string }>;
};

export default async function PlayerTeamsPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const { saved, joined, left } = await searchParams;

  const memberships = await prisma.teamMembership.findMany({
    where: { userId: user.id, role: "player" },
    include: {
      team: {
        include: {
          createdBy: {
            select: { manager: { select: { name: true, club: true } } },
          },
        },
      },
    },
    orderBy: { joinedAt: "desc" },
  });

  return (
    <AppShell>
      <Header title="Your teams" subtitle="Who sees what, per team." />

      <div className="space-y-4 shell-gutter pb-6">
        {saved ? (
          <p role="status" className="rounded-md border border-completion/30 bg-completion/10 px-3 py-2 text-xs text-completion-400">
            Sharing preferences saved.
          </p>
        ) : null}
        {joined === "1" ? (
          <p role="status" className="rounded-md border border-completion/30 bg-completion/10 px-3 py-2 text-xs text-completion-400">
            Joined. Your coach can see your name, position and age band. Nothing else until you switch it on below.
          </p>
        ) : null}
        {joined === "already" ? (
          <p role="status" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-strong">
            You're already in that team.
          </p>
        ) : null}
        {left ? (
          <p role="status" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-strong">
            You've left the team.
          </p>
        ) : null}

        {/* Redeem an invite code — the entry point for a player who
            has a code from a coach but no invite link. */}
        <section className="rounded-card border border-brand/25 bg-brand/5 p-5">
          <p className="font-display uppercase tracking-display text-muted text-[0.65rem]">
            Got an invite code?
          </p>
          <form action="/join" method="get" className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              name="code"
              placeholder="ABC123"
              autoCapitalize="characters"
              autoComplete="off"
              maxLength={12}
              aria-label="Team invite code"
              className="flex-1 rounded-md border border-white/10 bg-ink-900 px-4 py-2 font-display uppercase tracking-display text-white tabular-nums placeholder:text-muted/50 focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand shell-gutter font-display uppercase tracking-display text-sm text-ink-950 hover:bg-brand-400"
            >
              Redeem
            </button>
          </form>
        </section>

        {memberships.length === 0 ? (
          <div className="rounded-card border border-white/5 bg-ink-850 p-6 text-center shadow-card">
            <p className="text-sm text-white/85">You're not in any teams yet.</p>
            <p className="mt-1 text-xs text-muted">
              Ask your coach for the six-character invite code.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {memberships.map((m) => {
              const consent = (m.consent ?? {}) as ConsentShape;
              const coachName = m.team.createdBy.manager?.name ?? "Coach";
              const coachClub = m.team.createdBy.manager?.club ?? null;
              return (
                <li
                  key={m.id}
                  className="rounded-card border border-white/5 bg-ink-850 shadow-card"
                >
                  <div className="border-b border-white/5 px-5 py-4">
                    <p className="font-display uppercase tracking-display text-white text-lg">
                      {m.team.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Coach {coachName}
                      {coachClub ? <span className="text-muted"> · {coachClub}</span> : null}
                      {" · joined "}
                      {m.joinedAt.toLocaleDateString()}
                    </p>
                  </div>

                  <form action={updateMembershipConsent} className="shell-gutter py-4 space-y-3">
                    <input type="hidden" name="teamId" value={m.team.id} />
                    <p className="text-xs text-muted-strong">
                      Turn a field on to let your coach see it. Turn it off
                      any time — takes effect immediately.
                    </p>
                    {CONSENT_FIELDS.map((f) => (
                      <label
                        key={f.key}
                        htmlFor={`${m.id}_${f.key}`}
                        className="flex cursor-pointer items-start gap-3 rounded-md border border-white/5 bg-ink-900/60 p-3 hover:border-brand/30 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
                      >
                        <input
                          id={`${m.id}_${f.key}`}
                          name={f.key}
                          type="checkbox"
                          defaultChecked={Boolean(consent[f.key])}
                          className="mt-0.5 h-5 w-5 accent-brand"
                        />
                        <span className="min-w-0">
                          <span className="block font-display uppercase tracking-display text-white text-sm">
                            {f.label}
                          </span>
                          <span className="block text-xs text-muted-strong">
                            {f.body}
                          </span>
                        </span>
                      </label>
                    ))}
                    <button
                      type="submit"
                      className="inline-flex h-10 items-center rounded-full bg-brand px-4 font-display uppercase tracking-display text-xs text-ink-950 hover:bg-brand-400"
                    >
                      Save sharing
                    </button>
                  </form>

                  <form action={leaveTeam} className="border-t border-white/5 shell-gutter py-3">
                    <input type="hidden" name="teamId" value={m.team.id} />
                    <button
                      type="submit"
                      className="text-[0.7rem] font-display uppercase tracking-display text-muted hover:text-caution-300"
                    >
                      Leave team
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        )}

        <p className="pt-2 text-center text-xs text-muted">
          <Link href="/you" className="text-brand-400 hover:text-brand">
            ← Back to You
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
