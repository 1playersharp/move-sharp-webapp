import "server-only";
import { prisma } from "@/lib/prisma";
import { pbMetricByKey } from "@/lib/constants/pb-metrics";

// Ensure a Metric row exists for this player + key. Creates one lazily
// from the predefined PB_METRICS definitions when it's not there yet.
export async function ensureMetric(playerId: string, key: string) {
  const existing = await prisma.metric.findUnique({
    where: { playerId_key: { playerId, key } },
  });
  if (existing) return existing;

  const def = pbMetricByKey(key);
  if (!def) {
    throw new Error(`Unknown PB metric key: ${key}`);
  }

  return prisma.metric.create({
    data: {
      playerId,
      key,
      label: def.label,
      unit: def.unit,
      direction: def.direction,
      isCustom: false,
    },
  });
}
