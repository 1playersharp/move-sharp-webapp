"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";
import { ensureMetric } from "@/lib/metrics";
import { pbMetricByKey, isImprovement } from "@/lib/constants/pb-metrics";

function fail(next: string, error: string): never {
  const url = new URL(next, "http://localhost");
  url.searchParams.set("error", error);
  redirect(url.pathname + url.search);
}

export async function logPersonalBest(formData: FormData) {
  const user = await requirePlayer();

  const metricKey = String(formData.get("metricKey") ?? "");
  const def = pbMetricByKey(metricKey);
  if (!def) fail("/progress/log", "Unknown metric.");

  const valueRaw = String(formData.get("value") ?? "").trim();
  const value = Number(valueRaw);
  if (!Number.isFinite(value) || value <= 0) {
    fail(`/progress/log?metric=${metricKey}`, "Enter a valid value.");
  }

  const dateRaw = String(formData.get("recordedAt") ?? "").trim();
  const recordedAt = dateRaw ? new Date(dateRaw) : new Date();
  if (Number.isNaN(recordedAt.getTime())) {
    fail(`/progress/log?metric=${metricKey}`, "That date doesn't look right.");
  }

  const conditions: Record<string, string | number | undefined> = {};
  const fields = ["surface", "weather", "windAssist", "footwear", "notes"];
  for (const field of fields) {
    const raw = String(formData.get(field) ?? "").trim();
    if (raw) {
      if (field === "windAssist") {
        const n = Number(raw);
        if (Number.isFinite(n)) conditions[field] = n;
      } else {
        conditions[field] = raw.slice(0, 200);
      }
    }
  }

  const metric = await ensureMetric(user.player.id, metricKey);

  // Find current PB to decide if this entry is one.
  const currentPb = await prisma.metricEntry.findFirst({
    where: { metricId: metric.id, isPersonalBest: true },
  });
  const isPb =
    !currentPb || isImprovement(value, currentPb.value, def.direction);

  await prisma.$transaction(async (tx) => {
    if (isPb && currentPb) {
      await tx.metricEntry.update({
        where: { id: currentPb.id },
        data: { isPersonalBest: false },
      });
    }
    await tx.metricEntry.create({
      data: {
        metricId: metric.id,
        playerId: user.player.id,
        value,
        recordedAt,
        conditions: Object.keys(conditions).length > 0 ? conditions : undefined,
        isPersonalBest: isPb,
      },
    });
  });

  revalidatePath("/progress");
  revalidatePath(`/progress/${metricKey}`);
  redirect(`/progress/${metricKey}`);
}
