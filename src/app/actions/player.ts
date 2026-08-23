"use server";

import { revalidatePath } from "next/cache";
import type { TrainingContext } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";

const VALID_CONTEXTS = new Set<TrainingContext>(["home", "gym"]);

export async function setTrainingContext(formData: FormData) {
  const user = await requirePlayer();
  const raw = String(formData.get("context") ?? "");
  if (!VALID_CONTEXTS.has(raw as TrainingContext)) return;

  await prisma.player.update({
    where: { id: user.player.id },
    data: { trainingContext: raw as TrainingContext },
  });

  // Everywhere the context could change what's shown.
  revalidatePath("/");
  revalidatePath("/train");
  revalidatePath("/train/exercise");
  revalidatePath("/you");
}
