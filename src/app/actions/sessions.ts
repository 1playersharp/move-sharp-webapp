"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";
import { toUtcDay } from "@/lib/date";
import { ensureMetric } from "@/lib/metrics";
import { pbMetricByKey, isImprovement } from "@/lib/constants/pb-metrics";

export async function startSession(formData: FormData) {
  const user = await requirePlayer();
  const sessionTemplateId = String(formData.get("sessionTemplateId") ?? "");
  if (!sessionTemplateId) throw new Error("sessionTemplateId is required");

  const template = await prisma.sessionTemplate.findUnique({
    where: { id: sessionTemplateId },
  });
  if (!template) throw new Error("Session template not found");

  // Snapshot today's readiness so Team consent can share the pre-session
  // number without exposing the day's mood check-in.
  const today = toUtcDay(new Date());
  const readiness = await prisma.readinessEntry.findUnique({
    where: {
      playerId_recordedOn: { playerId: user.player.id, recordedOn: today },
    },
  });

  const session = await prisma.session.create({
    data: {
      playerId: user.player.id,
      programmeId: template.programmeId,
      sessionTemplateId: template.id,
      startedAt: new Date(),
      readinessBefore: readiness
        ? {
            soreness: readiness.soreness,
            sleep: readiness.sleep,
            energy: readiness.energy,
            mood: readiness.mood,
          }
        : undefined,
    },
  });

  redirect(`/session/${session.id}`);
}

export async function completeSession(sessionId: string, formData: FormData) {
  const user = await requirePlayer();

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || session.playerId !== user.player.id) {
    throw new Error("Session not found");
  }

  const completedItemIds = formData
    .getAll("completedItemIds")
    .map((v) => String(v))
    .filter(Boolean);

  const feltAfterRaw = Number(formData.get("feltAfter"));
  const feltAfter =
    Number.isInteger(feltAfterRaw) && feltAfterRaw >= 1 && feltAfterRaw <= 5
      ? feltAfterRaw
      : null;

  const notesRaw = String(formData.get("notes") ?? "").trim();
  const notes = notesRaw ? notesRaw.slice(0, 500) : null;

  // Look up completed items' PB metric keys so we know which pb_<id>
  // form fields to persist as MetricEntry rows.
  const items = await prisma.sessionTemplateItem.findMany({
    where: { id: { in: completedItemIds } },
    include: { exercise: { select: { pbMetricKey: true } } },
  });

  await prisma.session.update({
    where: { id: sessionId },
    data: {
      completedAt: new Date(),
      completedItemIds,
      feltAfter,
      notes,
    },
  });

  for (const item of items) {
    const key = item.exercise.pbMetricKey;
    if (!key) continue;
    const raw = String(formData.get(`pb_${item.id}`) ?? "").trim();
    if (!raw) continue;
    const value = Number(raw);
    const def = pbMetricByKey(key);
    if (!Number.isFinite(value) || value <= 0 || !def) continue;

    const metric = await ensureMetric(user.player.id, key);
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
          recordedAt: new Date(),
          sessionId,
          isPersonalBest: isPb,
        },
      });
    });
  }

  revalidatePath("/");
  revalidatePath("/train");
  revalidatePath("/progress");
  redirect("/?session=complete");
}

export async function abandonSession(sessionId: string) {
  const user = await requirePlayer();
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || session.playerId !== user.player.id) {
    throw new Error("Session not found");
  }
  await prisma.session.delete({ where: { id: sessionId } });
  redirect("/train");
}
