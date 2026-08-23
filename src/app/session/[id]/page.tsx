import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/layout/AppShell";
import { SessionLogger } from "@/components/session/SessionLogger";

type Props = { params: Promise<{ id: string }> };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
        <div className="space-y-4 px-5 pt-4">
          <Link href="/train" className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint">
            ← Train
          </Link>
          <h1 className="font-display uppercase tracking-display text-white text-2xl leading-tight">
            {template.name}
          </h1>
          <p className="text-sm text-muted">
            Completed {session.completedAt.toLocaleDateString()} —{" "}
            {session.completedItemIds.length}/{template.items.length} exercises logged.
          </p>
          {session.notes ? (
            <blockquote className="rounded-card border border-white/5 bg-ink-850 p-3 text-sm italic text-muted-strong">
              {session.notes}
            </blockquote>
          ) : null}
        </div>
      </AppShell>
    );
  }

  const items = template.items.map((item) => {
    const prescription = (item.prescription as { display?: string; notes?: string } | null) ?? {};
    return {
      id: item.id,
      name: item.exercise.name,
      category: item.exercise.category,
      prescription: prescription.display ?? "As prescribed",
      notes: prescription.notes,
    };
  });

  const programmeName = template.programme?.name;

  return (
    <AppShell>
      <div className="space-y-6 px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <div>
          <Link href={programmeName ? `/train/${template.programme?.slug}` : "/train"} className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint">
            ← {programmeName ?? "Train"}
          </Link>
          <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl leading-tight">
            {template.name}
          </h1>
          {template.week != null && template.day != null ? (
            <p className="mt-1 text-xs text-muted">
              Week {template.week} · Session {template.day}
            </p>
          ) : null}
          {template.focus ? (
            <p className="mt-2 text-sm text-muted-strong">{template.focus}</p>
          ) : null}
          {template.gymCue || template.homeCue ? (
            <dl className="mt-3 space-y-1 text-xs">
              {template.gymCue ? (
                <div className="flex gap-2">
                  <dt className="w-10 shrink-0 font-display uppercase tracking-display text-mint-400">Gym</dt>
                  <dd className="text-muted">{template.gymCue}</dd>
                </div>
              ) : null}
              {template.homeCue ? (
                <div className="flex gap-2">
                  <dt className="w-10 shrink-0 font-display uppercase tracking-display text-mint-400">Home</dt>
                  <dd className="text-muted">{template.homeCue}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>

        <SessionLogger sessionId={session.id} items={items} />
      </div>
    </AppShell>
  );
}
