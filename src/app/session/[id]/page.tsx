import { notFound } from "next/navigation";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { SessionLogger } from "@/components/session/SessionLogger";
import { pbMetricByKey } from "@/lib/constants/pb-metrics";
import { MOTION_SPEC_BY_SLUG } from "@/lib/exercise/pilots";

type Props = { params: Promise<{ id: string }> };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function pbUnitPlaceholder(unit: string): string {
  switch (unit) {
    case "seconds": return "seconds (e.g. 2.85)";
    case "meters": return "meters (e.g. 6.42)";
    case "centimeters": return "cm (e.g. 62)";
    case "reps": return "reps";
    case "kilograms": return "kg";
    case "watts": return "watts";
    default: return "value";
  }
}

export default async function SessionPage({ params }: Props) {
  const user = await requirePlayer();
  const { id } = await params;

  if (!UUID_RE.test(id)) notFound();

  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      sessionTemplate: {
        include: {
          programme: true,
          items: {
            include: { exercise: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!session || session.playerId !== user.player.id) notFound();
  const template = session.sessionTemplate;
  if (!template) notFound();

  // If already completed, land on a read-only summary. Keeps the URL stable.
  if (session.completedAt) {
    return (
      <AppShell>
        <Header
          back={{ href: "/train", label: "Train" }}
          title={template.name}
          subtitle={`Completed ${session.completedAt.toLocaleDateString()} — ${session.completedItemIds.length}/${template.items.length} exercises logged.`}
        />
        {session.notes ? (
          <div className="shell-gutter">
            <blockquote className="rounded-card border border-white/5 bg-ink-850 p-3 text-sm italic text-muted-strong">
              {session.notes}
            </blockquote>
          </div>
        ) : null}
      </AppShell>
    );
  }

  const items = template.items.map((item) => {
    const prescription = (item.prescription as { display?: string; notes?: string } | null) ?? {};
    const pbKey = item.exercise.pbMetricKey ?? null;
    const pbDef = pbKey ? pbMetricByKey(pbKey) : null;
    return {
      id: item.id,
      slug: item.exercise.slug,
      name: item.exercise.name,
      category: item.exercise.category,
      // Procedural fallback for exercises the 3D Coach has no clip for.
      // Plain data, so it crosses the server/client boundary as-is.
      spec: MOTION_SPEC_BY_SLUG[item.exercise.slug] ?? null,
      prescription: prescription.display ?? "As prescribed",
      notes: prescription.notes,
      pbMetricKey: pbKey,
      pbMetricLabel: pbDef?.label ?? null,
      pbUnitHint: pbDef ? pbUnitPlaceholder(pbDef.unit) : null,
    };
  });

  const programmeName = template.programme?.name;

  return (
    <AppShell>
      <Header
        back={{
          href: programmeName ? `/train/${template.programme?.slug}` : "/train",
          label: programmeName ?? "Train",
        }}
        title={template.name}
        subtitle={
          template.week != null && template.day != null
            ? `Week ${template.week} · Session ${template.day}`
            : undefined
        }
      >
        {template.focus ? (
          <p className="mt-2 text-sm text-muted-strong">{template.focus}</p>
        ) : null}
        {template.gymCue || template.homeCue ? (
          <dl className="mt-3 space-y-1 text-xs">
            {template.gymCue ? (
              <div className="flex gap-2">
                <dt className="w-10 shrink-0 font-display uppercase tracking-display text-muted">Gym</dt>
                <dd className="text-muted">{template.gymCue}</dd>
              </div>
            ) : null}
            {template.homeCue ? (
              <div className="flex gap-2">
                <dt className="w-10 shrink-0 font-display uppercase tracking-display text-muted">Home</dt>
                <dd className="text-muted">{template.homeCue}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </Header>

      <div className="shell-gutter">
        <SessionLogger sessionId={session.id} items={items} />
      </div>
    </AppShell>
  );
}
