"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";
import {
  QUIZ_QUESTION_KEYS,
  type QuizAnswerKey,
  type QuizAnswers,
} from "@/lib/constants/quiz";
import { generateCustomProgramme } from "@/lib/quiz/generator";

function fail(msg: string): never {
  redirect(`/quiz?error=${encodeURIComponent(msg)}`);
}

export async function submitQuiz(formData: FormData) {
  const user = await requirePlayer();

  // Collect answers — every question is a required radio.
  const answers: Partial<QuizAnswers> = {};
  for (const key of QUIZ_QUESTION_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    if (!value) fail("Answer every question before submitting.");
    answers[key as QuizAnswerKey] = value;
  }

  const exercises = await prisma.exercise.findMany();
  const generated = generateCustomProgramme({
    answers: answers as QuizAnswers,
    player: {
      id: user.player.id,
      dateOfBirth: user.player.dateOfBirth,
      position: user.player.position,
    },
    exercises,
  });

  const programme = await prisma.programme.create({
    data: {
      slug: generated.slug,
      name: generated.name,
      description: generated.description,
      intent: generated.intent,
      ageBands: generated.ageBands,
      qualities: generated.qualities,
      weeks: generated.weeks,
      sessionsPerWeek: generated.sessionsPerWeek,
      equipmentGym: generated.equipmentGym,
      equipmentHome: generated.equipmentHome,
      curriculum: generated.curriculum,
      isCustom: true,
      createdForPlayerId: user.player.id,
    },
  });

  // Materialise a SessionTemplate per curriculum session. Without these the
  // programme page has nothing to start — it could only be browsed and
  // deleted — because Start posts a sessionTemplateId. The seeded library
  // programmes get theirs from prisma/session-templates/generate.ts; custom
  // ones are built here, from the same curriculum shape.
  await createTemplatesFor(programme.id, generated, exercises);

  revalidatePath("/train");
  redirect(`/train/${generated.slug}`);
}

type GeneratedForTemplates = {
  slug: string;
  curriculum: Array<{
    week: number;
    sessions: Array<{
      name: string;
      focus: string;
      gymCue?: string;
      homeCue?: string;
      exerciseSlugs?: string[];
    }>;
  }>;
};

async function createTemplatesFor(
  programmeId: string,
  generated: GeneratedForTemplates,
  exercises: Array<{ id: string; slug: string; defaultPrescription: string | null }>,
) {
  const idBySlug = new Map(exercises.map((e) => [e.slug, e] as const));

  for (const week of generated.curriculum) {
    for (const [index, session] of week.sessions.entries()) {
      const day = index + 1;
      const items = (session.exerciseSlugs ?? [])
        .map((slug) => idBySlug.get(slug))
        .filter((e): e is NonNullable<typeof e> => Boolean(e));
      // A session with no resolvable exercises would produce an empty logger,
      // so skip it rather than create something unusable.
      if (items.length === 0) continue;

      await prisma.sessionTemplate.create({
        data: {
          slug: `${generated.slug}-w${week.week}-d${day}`,
          name: session.name,
          programmeId,
          week: week.week,
          day,
          focus: session.focus,
          gymCue: session.gymCue,
          homeCue: session.homeCue,
          items: {
            create: items.map((e, order) => ({
              exerciseId: e.id,
              order: order + 1,
              prescription: { display: e.defaultPrescription ?? "As prescribed" },
            })),
          },
        },
      });
    }
  }
}
