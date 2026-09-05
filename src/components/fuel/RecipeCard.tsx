import Link from "next/link";
import type { Recipe } from "@prisma/client";
import { FUEL_TAG_LABEL } from "@/lib/fuel/rails";

// Deliberately does NOT accept carbsG/proteinG. MoveSharp shows no
// calorie or macronutrient figures anywhere — see /for-parents. Keeping
// them out of the prop type means a future change can't reintroduce
// them here without a type error.
type Props = {
  recipe: Pick<Recipe, "slug" | "name" | "servings" | "fuelTags">;
};

export function RecipeCard({ recipe }: Props) {
  return (
    <Link
      href={`/fuel/recipes/${recipe.slug}`}
      className="block rounded-card border border-white/5 bg-ink-850 p-4 shadow-card hover:border-brand"
    >
      <h3 className="font-display uppercase tracking-display text-white text-base leading-tight">
        {recipe.name}
      </h3>
      <p className="mt-1 text-xs text-muted">
        Serves {recipe.servings}
      </p>
      {recipe.fuelTags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {recipe.fuelTags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand/10 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-brand-400"
            >
              {FUEL_TAG_LABEL[t]}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
