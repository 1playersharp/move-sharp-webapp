"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePlayer, requireManager } from "@/lib/auth";
import { ageInYears } from "@/lib/age-band";
import { generateInviteCode } from "@/lib/team/invite-code";

function fail(path: string, msg: string): never {
  redirect(`${path}?error=${encodeURIComponent(msg)}`);
}

async function ownedTeamOrRedirect(teamId: string, managerUserId: string) {
  if (!teamId) redirect("/coach/teams");
  const team = await prisma.team.findFirst({
    where: { id: teamId, createdByUserId: managerUserId },
    select: { id: true },
  });
  if (!team) redirect("/coach/teams");
  return team;
}

// Create a team. Manager becomes the first membership row so the
// team.memberships relation lists them alongside players.
export async function createTeam(formData: FormData) {
  const user = await requireManager();

  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) fail("/coach/teams/new", "Enter a team name.");
  if (name.length > 60) fail("/coach/teams/new", "Team name is too long (60 chars max).");

  // Retry once on a rare code collision — with 6 chars from a 31-char
  // alphabet that's ~10^-4 probability per row, so one retry is safe.
  const code = await tryUniqueCode();
  if (!code) fail("/coach/teams/new", "Couldn't generate an invite code — try again.");

  const team = await prisma.team.create({
    data: {
      name,
      inviteCode: code,
      createdByUserId: user.id,
      memberships: {
        create: {
          userId: user.id,
          role: "manager",
          // Consent flags are meaningless for a manager membership but
          // the field is non-null in schema; keep the safe defaults.
        },
      },
    },
  });

  revalidatePath("/coach");
  revalidatePath("/coach/teams");
  redirect(`/coach/teams/${team.id}`);
}

export async function rotateInviteCode(formData: FormData) {
  const user = await requireManager();
  const teamId = String(formData.get("teamId") ?? "");
  await ownedTeamOrRedirect(teamId, user.id);

  const code = await tryUniqueCode();
  if (!code) redirect(`/coach/teams/${teamId}?error=code`);

  await prisma.team.update({
    where: { id: teamId },
    data: { inviteCode: code },
  });

  revalidatePath(`/coach/teams/${teamId}`);
  redirect(`/coach/teams/${teamId}?rotated=1`);
}

export async function removeMember(formData: FormData) {
  const user = await requireManager();
  const teamId = String(formData.get("teamId") ?? "");
  const membershipId = String(formData.get("membershipId") ?? "");
  await ownedTeamOrRedirect(teamId, user.id);

  // Refuse to remove the manager membership — that would leave the
  // team ownerless with respect to the roster listing. The team.
  // createdByUserId back-reference still points here, but the roster
  // strip would show an empty coach row. Keep it consistent.
  const membership = await prisma.teamMembership.findUnique({
    where: { id: membershipId },
    select: { role: true, teamId: true },
  });
  if (!membership || membership.teamId !== teamId) {
    redirect(`/coach/teams/${teamId}`);
  }
  if (membership.role === "manager") {
    redirect(`/coach/teams/${teamId}?error=owner`);
  }

  await prisma.teamMembership.delete({ where: { id: membershipId } });
  revalidatePath(`/coach/teams/${teamId}`);
  redirect(`/coach/teams/${teamId}?removed=1`);
}

// Player-side: redeem an invite code and join the team. Consent
// flags default to all false — the player controls what the manager
// sees on the /you/teams surface. Under-16s must have gone through
// the parent-ack flow on the interstitial; the parent_ack form
// field re-asserts it server-side so a crafted request can't
// bypass the friction.
export async function joinTeamByCode(formData: FormData) {
  const user = await requirePlayer();

  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const parentAckRaw = String(formData.get("parentAck") ?? "");

  if (!code) redirect("/you/teams?error=code");

  const team = await prisma.team.findUnique({
    where: { inviteCode: code },
    select: { id: true },
  });
  if (!team) redirect(`/join/${encodeURIComponent(code)}?error=notfound`);

  const existing = await prisma.teamMembership.findUnique({
    where: { userId_teamId: { userId: user.id, teamId: team.id } },
    select: { id: true },
  });
  if (existing) {
    redirect(`/you/teams?joined=already`);
  }

  const isUnder16 = ageInYears(user.player.dateOfBirth) < 16;
  if (isUnder16 && parentAckRaw !== "on") {
    // Interstitial should have gated this. If a crafted request skipped
    // it, bounce back to the join screen so the ack is shown.
    redirect(`/join/${encodeURIComponent(code)}?error=parent`);
  }

  await prisma.$transaction([
    prisma.teamMembership.create({
      data: {
        userId: user.id,
        teamId: team.id,
        role: "player",
        // Consent defaults come from the schema (all false). The player
        // opts in per-field on /you/teams after joining.
      },
    }),
    prisma.joinConsent.create({
      data: {
        playerId: user.player.id,
        teamId: team.id,
        isUnder16,
        parentAck: isUnder16,
      },
    }),
  ]);

  revalidatePath("/you");
  revalidatePath("/you/teams");
  redirect("/you/teams?joined=1");
}

// Player-side: update the per-field consent flags on a membership
// the player owns. The three fields are the only ones a manager can
// ever see; everything else stays private regardless.
export async function updateMembershipConsent(formData: FormData) {
  const user = await requirePlayer();
  const teamId = String(formData.get("teamId") ?? "");
  if (!teamId) redirect("/you/teams");

  const membership = await prisma.teamMembership.findUnique({
    where: { userId_teamId: { userId: user.id, teamId } },
    select: { id: true, role: true },
  });
  if (!membership || membership.role !== "player") {
    redirect("/you/teams");
  }

  const consent = {
    sessionsVisible: formData.get("sessionsVisible") === "on",
    readinessVisible: formData.get("readinessVisible") === "on",
    pbsVisible: formData.get("pbsVisible") === "on",
  };

  await prisma.teamMembership.update({
    where: { id: membership.id },
    data: { consent },
  });

  revalidatePath("/you/teams");
  redirect("/you/teams?saved=1");
}

// Player leaves a team they're in. Deletes the membership row;
// manager keeps the team.
export async function leaveTeam(formData: FormData) {
  const user = await requirePlayer();
  const teamId = String(formData.get("teamId") ?? "");
  if (!teamId) redirect("/you/teams");

  await prisma.teamMembership.deleteMany({
    where: { userId: user.id, teamId, role: "player" },
  });

  revalidatePath("/you/teams");
  redirect("/you/teams?left=1");
}

// Try up to 3 times to generate a code not already used.
async function tryUniqueCode(): Promise<string | null> {
  for (let i = 0; i < 3; i++) {
    const candidate = generateInviteCode();
    try {
      // Simplest uniqueness check — count first, then rely on the
      // @unique constraint at insert time. Cheap and correct.
      const existing = await prisma.team.findUnique({
        where: { inviteCode: candidate },
        select: { id: true },
      });
      if (!existing) return candidate;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) continue;
      throw e;
    }
  }
  return null;
}
