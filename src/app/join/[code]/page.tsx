import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { requireAuthUser, getCurrentUser } from "@/lib/auth";
import { ageInYears } from "@/lib/age-band";
import { prisma } from "@/lib/prisma";
import { JoinTeamForm } from "@/components/team/JoinTeamForm";

type Props = {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function JoinTeamPage({ params, searchParams }: Props) {
  // requireAuthUser handles the unauth → sign-in redirect. We route
  // through /sign-in?next=/join/<code> so on successful sign-in the
  // player lands right back here.
  const authUser = await getCurrentUser();
  if (!authUser) {
    const { code } = await params;
    redirect(`/sign-in?next=${encodeURIComponent(`/join/${code}`)}`);
  }
  await requireAuthUser();

  const { code: codeRaw } = await params;
  const { error } = await searchParams;
  const code = codeRaw.toUpperCase();

  // Coaches can't join a team as a player. Redirect them home rather
  // than showing a confusing preview.
  if (authUser.manager) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md shell-gutter py-10">
          <h1 className="font-display uppercase tracking-display text-white text-2xl">
            Join links are for players.
          </h1>
          <p className="mt-3 text-sm text-muted">
            You're signed in with a coach account. Coach accounts can't join a
            team from the player side. Sign in as the player who received the
            invite, or head to your coach home.
          </p>
          <Link
            href="/coach"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-brand shell-gutter font-display uppercase tracking-display text-sm text-ink-950 hover:bg-brand-400"
          >
            Coach home
          </Link>
        </div>
      </AppShell>
    );
  }

  // No player row yet — this account was created but never onboarded.
  if (!authUser.player) {
    redirect(`/onboarding?next=${encodeURIComponent(`/join/${code}`)}`);
  }

  const team = await prisma.team.findUnique({
    where: { inviteCode: code },
    include: {
      createdBy: {
        select: { manager: { select: { name: true, club: true } } },
      },
    },
  });

  if (!team || error === "notfound") {
    return (
      <AppShell>
        <div className="mx-auto max-w-md shell-gutter py-10">
          <p className="font-display uppercase tracking-display text-caution-300 text-xs">
            Not found
          </p>
          <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl">
            That invite code doesn't match a team.
          </h1>
          <p className="mt-3 text-sm text-muted">
            Codes are six characters. Double-check with your coach —
            capitalisation doesn't matter but the letters and numbers do.
          </p>
          <Link
            href="/you/teams"
            className="mt-6 inline-flex h-11 items-center rounded-full border border-white/20 shell-gutter font-display uppercase tracking-display text-sm text-white hover:border-white/60"
          >
            Back to your teams
          </Link>
        </div>
      </AppShell>
    );
  }

  const alreadyMember = await prisma.teamMembership.findUnique({
    where: { userId_teamId: { userId: authUser.id, teamId: team.id } },
    select: { id: true },
  });
  if (alreadyMember) {
    redirect(`/you/teams?joined=already`);
  }

  const isUnder16 = ageInYears(authUser.player.dateOfBirth) < 16;
  const coachName = team.createdBy.manager?.name ?? "Your coach";
  const coachClub = team.createdBy.manager?.club ?? null;

  return (
    <AppShell>
      <div className="mx-auto max-w-md shell-gutter py-10">
        <p className="font-display uppercase tracking-display text-muted text-xs">
          Team invite
        </p>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-3xl leading-[1.05]">
          Join {team.name}?
        </h1>
        <p className="mt-3 text-sm text-white/85">
          Invited by{" "}
          <span className="text-white">{coachName}</span>
          {coachClub ? <span className="text-muted"> · {coachClub}</span> : null}
          .
        </p>

        <div className="mt-6 space-y-2 rounded-card border border-white/10 bg-ink-850 p-5">
          <p className="font-display uppercase tracking-display text-muted text-[0.65rem]">
            What joining means
          </p>
          <p className="text-sm text-white/85">
            Your coach will see your name, position and age band. Nothing else
            unless you turn it on — sessions, readiness and personal bests are
            each their own opt-in switch on the You tab.
          </p>
        </div>

        {isUnder16 ? (
          <div className="mt-6 rounded-md border border-caution-500/25 bg-caution-500/5 p-4 text-sm text-white/90">
            <p className="font-display uppercase tracking-display text-caution-300 text-[0.7rem]">
              Under 16
            </p>
            <p className="mt-2">
              A parent must read this page with you before you accept. Talk
              to them about which fields you're OK with the coach seeing —
              you can change them later on the You tab.
            </p>
          </div>
        ) : null}

        {error === "parent" ? (
          <p role="alert" className="mt-4 rounded-md border border-caution-500/40 bg-caution-500/10 px-3 py-2 text-xs text-caution-200">
            Tick the parent-ack box to continue.
          </p>
        ) : null}

        <div className="mt-8">
          <JoinTeamForm code={code} isUnder16={isUnder16} />
        </div>

        <p className="mt-6 text-xs text-muted">
          Not the right team?{" "}
          <Link
            href="/you/teams"
            className="text-brand-400 underline underline-offset-4 hover:text-brand"
          >
            Back to your teams
          </Link>
          .
        </p>
      </div>
    </AppShell>
  );
}
