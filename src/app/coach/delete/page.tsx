import Link from "next/link";
import { CoachShell } from "@/components/layout/CoachShell";
import { requireManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DeleteCoachAccountForm } from "@/components/coach/DeleteCoachAccountForm";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function DeleteCoachAccountPage({ searchParams }: Props) {
  const user = await requireManager();
  const { error } = await searchParams;

  // Informed-consent surface — count the teams and players who'll
  // lose access when the coach account is deleted, so it's shown
  // explicitly before the typed-confirm unlocks.
  const [teamsCount, membersCount] = await Promise.all([
    prisma.team.count({ where: { createdByUserId: user.id } }),
    prisma.teamMembership.count({
      where: {
        role: "player",
        team: { createdByUserId: user.id },
      },
    }),
  ]);

  return (
    <CoachShell>
      <div className="mx-auto max-w-lg shell-gutter pt-[max(1rem,env(safe-area-inset-top))] pb-10">
        <Link
          href="/coach/you"
          className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint focus-visible:text-mint"
        >
          ← You
        </Link>
        <p className="mt-3 font-display uppercase tracking-display text-red-300 text-xs">
          Danger zone
        </p>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl md:text-3xl leading-tight">
          Delete your coach account.
        </h1>
        <p className="mt-3 text-sm text-white/85">
          This removes the coach account for{" "}
          <span className="text-white">
            {user.email ?? user.manager.name}
          </span>{" "}
          permanently. It cannot be undone.
        </p>

        {teamsCount > 0 ? (
          <div className="mt-6 rounded-card border border-red-500/40 bg-red-500/10 p-5">
            <p className="font-display uppercase tracking-display text-red-300 text-[0.65rem]">
              Impact on your teams
            </p>
            <p className="mt-2 text-sm text-white/95">
              Deleting your account also deletes the{" "}
              <span className="font-semibold text-white">
                {teamsCount} team{teamsCount === 1 ? "" : "s"}
              </span>{" "}
              you own. That removes{" "}
              <span className="font-semibold text-white">
                {membersCount} player{membersCount === 1 ? "" : "s"}
              </span>{" "}
              from{" "}
              {teamsCount === 1 ? "that team" : "those teams"}.
            </p>
            <p className="mt-3 text-xs text-white/80">
              Player accounts, PBs, sessions and everything else on the
              player side stay untouched — they just lose the team card
              on their You tab. If you want to hand the team over first,
              cancel here and create the new coach account before you
              delete this one.
            </p>
          </div>
        ) : (
          <p className="mt-6 text-xs text-muted-strong">
            You don't own any teams right now, so nobody loses access
            when you delete.
          </p>
        )}

        {error === "confirm" ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200"
          >
            Type the word <span className="font-semibold">delete</span> to
            confirm.
          </p>
        ) : null}

        <div className="mt-8 rounded-card border border-red-500/25 bg-red-500/5 p-5">
          <DeleteCoachAccountForm />
        </div>

        <p className="mt-6 text-xs text-muted">
          Changed your mind?{" "}
          <Link
            href="/coach/you"
            className="text-mint-400 underline underline-offset-4 hover:text-mint"
          >
            Back to You
          </Link>
          .
        </p>
      </div>
    </CoachShell>
  );
}
