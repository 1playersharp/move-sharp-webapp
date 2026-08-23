import type { ExerciseCategory } from "@prisma/client";

export const EXERCISE_CATEGORIES: Array<{
  key: ExerciseCategory;
  slug: string;
  label: string;
  blurb: string;
}> = [
  {
    key: "speed_acceleration",
    slug: "speed-acceleration",
    label: "Speed & Acceleration",
    blurb: "Wall drives, starts, top-end runs",
  },
  {
    key: "plyometric_elastic",
    slug: "plyometric-elastic",
    label: "Plyometrics & Elastic Strength",
    blurb: "Jumps, bounds, reactive landings",
  },
  {
    key: "decel_cod",
    slug: "decel-cod",
    label: "Deceleration & Change of Direction",
    blurb: "Cuts, plants, shuttle drills",
  },
  {
    key: "core_antirotation",
    slug: "core-antirotation",
    label: "Core & Anti-Rotation",
    blurb: "Anti-flex, anti-rotate, anti-lateral",
  },
  {
    key: "contact_duel_strength",
    slug: "contact-duel-strength",
    label: "Contact & Duel Strength",
    blurb: "Full-body strength for the pitch",
  },
  {
    key: "robustness_resilience",
    slug: "robustness-resilience",
    label: "Robustness & Resilience",
    blurb: "Mobility and tempo work",
  },
];

const BY_SLUG: Record<string, ExerciseCategory> = Object.fromEntries(
  EXERCISE_CATEGORIES.map((c) => [c.slug, c.key]),
);
const BY_KEY: Record<ExerciseCategory, (typeof EXERCISE_CATEGORIES)[number]> =
  Object.fromEntries(
    EXERCISE_CATEGORIES.map((c) => [c.key, c]),
  ) as Record<ExerciseCategory, (typeof EXERCISE_CATEGORIES)[number]>;

export function categoryFromSlug(slug: string): ExerciseCategory | null {
  return BY_SLUG[slug] ?? null;
}

export function categoryMeta(key: ExerciseCategory) {
  return BY_KEY[key];
}
