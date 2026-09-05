import Link from "next/link";
import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
import { requireManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachTeamsPage() {
  const user = await requireManager();

  const teams = await prisma.team.findMany({
    where: { createdByUserId: user.id },
    include: {
      _count: { select: { memberships: { where: { role: "player" } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <CoachShell>
      <Header
        title="Teams"
        subtitle="Create, invite, manage rosters."
        right={
          <Link
            href="/coach/teams/new"
            className="rounded-full bg-brand px-3 py-1 font-display uppercase tracking-display text-[0.65rem] text-ink-950 hover:bg-brand-400"
          >
            + New team
          </Link>
        }
      />

      <div className="space-y-3 shell-gutter pb-6">
        {teams.length === 0 ? (
          <Link
            href="/coach/teams/new"
            className="block rounded-card border border-dashed border-brand/40 bg-brand/5 p-6 text-center hover:border-brand"
          >
            <p className="font-display uppercase tracking-display text-white text-base">
              Create your first team
            </p>
            <p className="mt-1 text-xs text-muted">
              Give it a name. We'll generate an invite code you send to your
              players.
            </p>
          </Link>
        ) : (
          <ul className="space-y-3">
            {teams.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/coach/teams/${t.id}`}
                  className="group flex items-start justify-between gap-3 rounded-card border border-white/5 bg-ink-850 p-5 shadow-card hover:border-brand/40"
                >
                  <div className="min-w-0">
                    <p className="font-display uppercase tracking-display text-white text-lg leading-tight group-hover:text-brand">
                      {t.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {t._count.memberships} player
                      {t._count.memberships === 1 ? "" : "s"} · created{" "}
                      {t.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-brand/30 bg-brand/5 px-2 py-1 font-display uppercase tracking-display text-[0.65rem] tabular-nums text-muted-strong">
                    {t.inviteCode}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CoachShell>
  );
}
