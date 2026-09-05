import Link from "next/link";
import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
import { requireManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachHomePage() {
  const user = await requireManager();

  // Small dashboard so the landing has something to say. Teams count
  // and total members visible today; deeper aggregations arrive once
  // consent flows land.
  const [teamsCount, membersCount] = await Promise.all([
    prisma.team.count({ where: { createdByUserId: user.id } }),
    prisma.teamMembership.count({
      where: { team: { createdByUserId: user.id }, role: "player" },
    }),
  ]);

  return (
    <CoachShell>
      <Header
        title={`Hi, ${user.manager.name.split(" ")[0]}.`}
        subtitle={user.manager.club ?? "Coach"}
      />

      <div className="space-y-6 shell-gutter pb-6">
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-card border border-white/5 bg-ink-850 p-4 shadow-card">
            <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
              Teams
            </p>
            <p className="mt-1 font-display uppercase tracking-display text-white text-3xl">
              {teamsCount}
            </p>
          </div>
          <div className="rounded-card border border-white/5 bg-ink-850 p-4 shadow-card">
            <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
              Players
            </p>
            <p className="mt-1 font-display uppercase tracking-display text-white text-3xl">
              {membersCount}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="section-title">Your teams</h2>
            <Link
              href="/coach/teams"
              className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint"
            >
              Manage →
            </Link>
          </div>
          {teamsCount === 0 ? (
            <Link
              href="/coach/teams/new"
              className="block rounded-card border border-dashed border-mint/40 bg-mint/5 p-5 text-center hover:border-mint"
            >
              <p className="font-display uppercase tracking-display text-white text-sm">
                Create your first team
              </p>
              <p className="mt-1 text-xs text-muted">
                Generates an invite code you send to your players.
              </p>
            </Link>
          ) : (
            <Link
              href="/coach/teams"
              className="block rounded-card border border-white/5 bg-ink-850 p-4 shadow-card hover:border-mint/40"
            >
              <p className="text-sm text-white">
                {teamsCount} team{teamsCount === 1 ? "" : "s"} · {membersCount}{" "}
                player{membersCount === 1 ? "" : "s"} across them
              </p>
              <p className="mt-1 text-xs text-muted">
                Tap to view rosters, invite codes, and shared data.
              </p>
            </Link>
          )}
        </section>

        <section>
          <div className="rounded-md border border-white/10 bg-ink-900/50 p-4 text-xs text-muted-strong">
            <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
              Data privacy
            </p>
            <p className="mt-2">
              You only see the fields each player has opted in to share
              (sessions, readiness, personal bests). Basic profile (name,
              position, age band) is always visible once they join a team.
              Nothing you didn't earn.
            </p>
          </div>
        </section>
      </div>
    </CoachShell>
  );
}
