"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";
import { toUtcDay } from "@/lib/date";

function parseScale(value: FormDataEntryValue | null): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

export async function saveReadiness(formData: FormData) {
  const user = await requirePlayer();

  const soreness = parseScale(formData.get("soreness"));
  const sleep = parseScale(formData.get("sleep"));
  const energy = parseScale(formData.get("energy"));
  const mood = parseScale(formData.get("mood"));

  if (soreness == null || sleep == null || energy == null || mood == null) {
    redirect("/?checkin=incomplete");
  }

  const recordedOn = toUtcDay(new Date());

  await prisma.readinessEntry.upsert({
    where: {
      playerId_recordedOn: { playerId: user.player.id, recordedOn },
    },
    create: {
      playerId: user.player.id,
      recordedOn,
      soreness,
      sleep,
      energy,
      mood,
    },
    update: { soreness, sleep, energy, mood },
  });

  revalidatePath("/");
  redirect("/");
}
