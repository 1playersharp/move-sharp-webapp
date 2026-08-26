import type { FuelTag } from "@prisma/client";

// Every FuelTag in the schema needs an entry. Order here drives the
// order the rails render in on /fuel.

export type Rail = {
  tag: FuelTag;
  title: string;
  blurb: string;
};

export const FUEL_RAILS: Rail[] = [
  {
    tag: "before_training",
    title: "Before training",
    blurb: "60–90 minutes before. Simple carbs, a little protein. Nothing heavy or greasy.",
  },
  {
    tag: "pre_match",
    title: "Pre-match",
    blurb: "The bit right before kick-off. Fast carbs, light on the stomach, tested in training first.",
  },
  {
    tag: "match_day",
    title: "Match day",
    blurb: "The whole day around kick-off — proper meal 3 hours out, drink and top-ups after.",
  },
  {
    tag: "after_training",
    title: "After training",
    blurb: "Within 30 minutes: carbs + protein. Rebuild what you burned.",
  },
  {
    tag: "hydration",
    title: "Hydration",
    blurb: "Water first. Add salt + carbs on hot days or heavy sessions.",
  },
];

// Partial: school_gap is retired from the app but still lives in the
// FuelTag enum (see schema.prisma). No code path renders it.
export const FUEL_TAG_LABEL: Partial<Record<FuelTag, string>> = {
  before_training: "Before training",
  after_training: "After training",
  pre_match: "Pre-match",
  match_day: "Match day",
  hydration: "Hydration",
};

export const ALLERGEN_LABEL: Record<string, string> = {
  celery: "Celery",
  cereals_gluten: "Gluten",
  crustaceans: "Crustaceans",
  eggs: "Eggs",
  fish: "Fish",
  lupin: "Lupin",
  milk: "Milk",
  molluscs: "Molluscs",
  mustard: "Mustard",
  peanuts: "Peanuts",
  sesame: "Sesame",
  soybeans: "Soybeans",
  sulphites: "Sulphites",
  tree_nuts: "Tree nuts",
};
