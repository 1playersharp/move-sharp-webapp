"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth";
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
