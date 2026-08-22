import type { Allergen } from "@prisma/client";

// UK/EU 14 declared allergens (Food Information Regulation 1169/2011).
// Order mirrors the FSA reference list so it's familiar to UK users.
export const ALLERGENS: Array<{
  key: Allergen;
  label: string;
  examples: string;
}> = [
  { key: "cereals_gluten", label: "Cereals with gluten", examples: "wheat, rye, barley, oats" },
  { key: "crustaceans", label: "Crustaceans", examples: "prawns, crab, lobster" },
  { key: "eggs", label: "Eggs", examples: "" },
  { key: "fish", label: "Fish", examples: "" },
  { key: "peanuts", label: "Peanuts", examples: "" },
  { key: "soybeans", label: "Soybeans", examples: "" },
  { key: "milk", label: "Milk", examples: "including lactose" },
  { key: "tree_nuts", label: "Tree nuts", examples: "almonds, cashews, walnuts" },
  { key: "celery", label: "Celery", examples: "" },
  { key: "mustard", label: "Mustard", examples: "" },
  { key: "sesame", label: "Sesame", examples: "" },
  { key: "sulphites", label: "Sulphites", examples: "sulphur dioxide" },
  { key: "lupin", label: "Lupin", examples: "" },
  { key: "molluscs", label: "Molluscs", examples: "mussels, oysters, squid" },
];
