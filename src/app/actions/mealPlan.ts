"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { MealSlot } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";

const VALID_SLOTS = new Set<MealSlot>(["breakfast", "lunch", "dinner", "snack"]);

function parseDate(raw: string): Date | null {
  // Expect YYYY-MM-DD. Force UTC midnight so `@db.Date` stores the day
  // the user intended regardless of server timezone.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const d = new Date(`${raw}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function pinRecipeToPlan(formData: FormData) {
  const user = await requirePlayer();
  const dateRaw = String(formData.get("date") ?? "");
  const slotRaw = String(formData.get("slot") ?? "");
  const recipeId = String(formData.get("recipeId") ?? "");

  const date = parseDate(dateRaw);
  if (!date) redirect("/fuel/planner?error=bad-date");
  if (!VALID_SLOTS.has(slotRaw as MealSlot)) redirect("/fuel/planner?error=bad-slot");
  if (!recipeId) redirect("/fuel/planner?error=bad-recipe");

  await prisma.mealPlanEntry.upsert({
    where: {
      playerId_date_slot: {
        playerId: user.player.id,
        date,
        slot: slotRaw as MealSlot,
      },
    },
    create: {
      playerId: user.player.id,
      date,
      slot: slotRaw as MealSlot,
      recipeId,
    },
    update: { recipeId },
  });

  revalidatePath("/fuel/planner");
  redirect("/fuel/planner");
}

export async function unpinRecipeFromPlan(formData: FormData) {
  const user = await requirePlayer();
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/fuel/planner");

  await prisma.mealPlanEntry.deleteMany({
    where: { id, playerId: user.player.id },
  });

  revalidatePath("/fuel/planner");
  redirect("/fuel/planner");
}
