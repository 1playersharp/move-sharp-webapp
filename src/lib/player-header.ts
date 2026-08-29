import "server-only";
import type { TrainingContext } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Data behind <PlayerHeader />.
//
// Deliberately ONE round trip. The header is a single card; making the
// dashboard wait on a chain of counts for it would be the wrong trade.
// A nested select on the most recent programme-linked session pulls the
// programme, its full template list, and which templates this player has
// already completed — everything the card needs.

export type PlayerHeaderNextSession = {
  name: string;
  // Minutes. Not currently stored on SessionTemplate — see the note in
  // getPlayerHeaderData. Optional so the card degrades rather than
  // inventing a number.
  durationMin?: number;
  equipment?: string;
  href: string;
  templateId: string;
};

export type PlayerHeaderData = {
  firstName: string;
  avatarId: string | null;
  trainingContext: TrainingContext;
  programme?: {
    name: string;
    slug: string;
    sessionsCompleted: number;
    sessionsTotal: number;
    currentWeek?: number;
  };
  nextSession?: PlayerHeaderNextSession;
};

// "Aaron Ramsdale" -> "Aaron". First name only, by product rule.
export function firstNameOf(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export async function getPlayerHeaderData(player: {
  id: string;
  name: string;
  avatarId: string | null;
  trainingContext: TrainingContext;
}): Promise<PlayerHeaderData> {
  const base: PlayerHeaderData = {
    firstName: firstNameOf(player.name),
    avatarId: player.avatarId,
    trainingContext: player.trainingContext,
  };

  // Which programme is the player "on"? There's no Player.activeProgrammeId
  // column, so it's derived: the programme behind their most recent
  // programme-linked session. That's accurate for the way sessions are
  // actually started today and needs no schema change.
  const latest = await prisma.session.findFirst({
    where: { playerId: player.id, programmeId: { not: null } },
    orderBy: { startedAt: "desc" },
    select: {
      programme: {
        select: {
          name: true,
          slug: true,
          weeks: true,
          sessionsPerWeek: true,
          equipmentGym: true,
          equipmentHome: true,
          templates: {
            select: { id: true, name: true, week: true, day: true },
            orderBy: [{ week: "asc" }, { day: "asc" }],
          },
          sessions: {
            where: { playerId: player.id, completedAt: { not: null } },
            select: { sessionTemplateId: true },
          },
        },
      },
    },
  });

  const programme = latest?.programme;
  if (!programme) return base;

  const completedTemplateIds = new Set(
    programme.sessions
      .map((s) => s.sessionTemplateId)
      .filter((id): id is string => Boolean(id)),
  );

  // Most seeded programmes aren't materialised into SessionTemplate rows
  // yet (only First-Step Acceleration is). When there are no templates we
  // still show honest progress using the programme's own shape.
  const hasTemplates = programme.templates.length > 0;
  const sessionsTotal = hasTemplates
    ? programme.templates.length
    : programme.weeks * programme.sessionsPerWeek;
  const sessionsCompleted = hasTemplates
    ? completedTemplateIds.size
    : programme.sessions.length;

  const nextTemplate = hasTemplates
    ? programme.templates.find((t) => !completedTemplateIds.has(t.id))
    : undefined;

  const equipment =
    player.trainingContext === "gym"
      ? programme.equipmentGym
      : programme.equipmentHome;

  return {
    ...base,
    programme: {
      name: programme.name,
      slug: programme.slug,
      sessionsCompleted,
      sessionsTotal,
      currentWeek: nextTemplate?.week ?? undefined,
    },
    nextSession: nextTemplate
      ? {
          name: nextTemplate.name,
          // No duration is stored anywhere on SessionTemplate. Left
          // undefined rather than estimated — the card omits it.
          durationMin: undefined,
          equipment: equipment ?? undefined,
          href: `/train/${programme.slug}`,
          templateId: nextTemplate.id,
        }
      : undefined,
  };
}
