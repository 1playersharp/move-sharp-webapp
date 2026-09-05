import type { MetricUnit, MetricDirection } from "@prisma/client";

// Predefined PB metrics — derived from the locked data model. Players
// don't need to configure anything; a Metric row is lazily created the
// first time a value gets logged for a key.
export type PbMetric = {
  key: string;
  label: string;
  short: string;
  unit: MetricUnit;
  direction: MetricDirection;
  // Category grouping for the Bests view.
  group: "sprint" | "jump" | "agility" | "strength" | "strength_endurance";
};

export const PB_METRICS: PbMetric[] = [
  { key: "sprint-100m", label: "100m Sprint", short: "100m", unit: "seconds", direction: "lower_better", group: "sprint" },
  { key: "sprint-40m", label: "40m Sprint", short: "40m", unit: "seconds", direction: "lower_better", group: "sprint" },
  { key: "flying-20m", label: "Flying 20m", short: "Fly 20m", unit: "seconds", direction: "lower_better", group: "sprint" },
  { key: "flying-10m", label: "Flying 10m", short: "Fly 10m", unit: "seconds", direction: "lower_better", group: "sprint" },
  { key: "sprint-10m", label: "10m Sprint", short: "10m", unit: "seconds", direction: "lower_better", group: "sprint" },
  { key: "hill-sprint-30m", label: "Hill Sprint 30m", short: "Hill 30m", unit: "seconds", direction: "lower_better", group: "sprint" },

  { key: "vertical-jump", label: "Vertical Jump", short: "Vertical", unit: "centimeters", direction: "higher_better", group: "jump" },
  { key: "broad-jump", label: "Broad Jump", short: "Broad", unit: "centimeters", direction: "higher_better", group: "jump" },
  { key: "standing-triple-jump", label: "Standing Triple Jump", short: "Triple", unit: "meters", direction: "higher_better", group: "jump" },
  { key: "cmj", label: "Countermovement Jump", short: "CMJ", unit: "centimeters", direction: "higher_better", group: "jump" },
  { key: "single-leg-broad-jump", label: "Single-Leg Broad Jump", short: "SL Broad", unit: "centimeters", direction: "higher_better", group: "jump" },

  { key: "shuttle-5-10-5", label: "5-10-5 Agility", short: "5-10-5", unit: "seconds", direction: "lower_better", group: "agility" },
  { key: "l-drill", label: "L-Drill (3-cone)", short: "L-Drill", unit: "seconds", direction: "lower_better", group: "agility" },
  { key: "t-drill", label: "T-Drill", short: "T-Drill", unit: "seconds", direction: "lower_better", group: "agility" },
  { key: "agility-505", label: "505 Agility Test", short: "505", unit: "seconds", direction: "lower_better", group: "agility" },
  { key: "illinois-agility", label: "Illinois Agility Test", short: "Illinois", unit: "seconds", direction: "lower_better", group: "agility" },
  { key: "arrowhead-agility", label: "Arrowhead Agility", short: "Arrowhead", unit: "seconds", direction: "lower_better", group: "agility" },

  { key: "back-squat-1rm", label: "Back Squat 1RM", short: "Squat", unit: "kilograms", direction: "higher_better", group: "strength" },
  { key: "bench-press-1rm", label: "Bench Press 1RM", short: "Bench", unit: "kilograms", direction: "higher_better", group: "strength" },
  { key: "deadlift-3rm", label: "Trap-Bar Deadlift 3RM", short: "TB Dead", unit: "kilograms", direction: "higher_better", group: "strength" },

  { key: "plank-hold", label: "Plank Hold", short: "Plank", unit: "seconds", direction: "higher_better", group: "strength_endurance" },
  { key: "push-ups-max", label: "Push-Ups (max reps)", short: "Push-Ups", unit: "reps", direction: "higher_better", group: "strength_endurance" },
  { key: "pull-ups-max", label: "Pull-Ups (max reps)", short: "Pull-Ups", unit: "reps", direction: "higher_better", group: "strength_endurance" },
  { key: "sit-ups-max", label: "Sit-Ups (max reps)", short: "Sit-Ups", unit: "reps", direction: "higher_better", group: "strength_endurance" },
  { key: "chin-ups-max", label: "Chin-Ups (max reps)", short: "Chin-Ups", unit: "reps", direction: "higher_better", group: "strength_endurance" },
];

export const PB_GROUP_LABEL: Record<PbMetric["group"], string> = {
  sprint: "Sprint",
  jump: "Jump & Bound",
  agility: "Agility",
  strength: "Strength",
  strength_endurance: "Strength Endurance",
};

const BY_KEY = new Map(PB_METRICS.map((m) => [m.key, m] as const));
export function pbMetricByKey(key: string): PbMetric | undefined {
  return BY_KEY.get(key);
}

// Format a value for display given its unit.
export function formatMetricValue(value: number, unit: MetricUnit): string {
  switch (unit) {
    case "seconds":
      // Sprint times get 2 decimals; longer times whole seconds.
      return value < 60 ? value.toFixed(2) + "s" : value.toFixed(1) + "s";
    case "meters":
      return value.toFixed(2) + "m";
    case "centimeters":
      return value.toFixed(0) + " cm";
    case "reps":
      return String(Math.round(value)) + " reps";
    case "kilograms":
      return value.toFixed(1) + " kg";
    case "watts":
      return Math.round(value) + " W";
    case "custom":
      return String(value);
  }
}

// Compare two values against a direction; returns true if `next` is a PB
// over `previous` (strictly better).
export function isImprovement(
  next: number,
  previous: number,
  direction: MetricDirection,
): boolean {
  return direction === "lower_better" ? next < previous : next > previous;
}
