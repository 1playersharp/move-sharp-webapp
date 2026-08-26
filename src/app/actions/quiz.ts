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

  await prisma.programme.create({
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

  revalidatePath("/train");
  redirect(`/train/${generated.slug}`);
}
