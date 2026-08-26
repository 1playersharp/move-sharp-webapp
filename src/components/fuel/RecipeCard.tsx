import Link from "next/link";
import type { Recipe } from "@prisma/client";
import { FUEL_TAG_LABEL } from "@/lib/fuel/rails";

type Props = {
  recipe: Pick<
    Recipe,
    "slug" | "name" | "servings" | "fuelTags" | "carbsG" | "proteinG"
  >;
};

export function RecipeCard({ recipe }: Props) {
  return (
    <Link
      href={`/fuel/recipes/${recipe.slug}`}
      className="block rounded-card border border-white/5 bg-ink-850 p-4 shadow-card hover:border-mint"
    >
      <h3 className="font-display uppercase tracking-display text-white text-base leading-tight">
        {recipe.name}
      </h3>
      <p className="mt-1 text-xs text-muted">
        Serves {recipe.servings}
      </p>
      {recipe.carbsG != null || recipe.proteinG != null ? (
        <div className="mt-2 flex gap-3 text-[0.7rem]">
          {recipe.carbsG != null ? (
            <span className="text-mint-400">
              <span className="font-display uppercase tracking-display">Carbs</span>{" "}
              <span className="text-white">{recipe.carbsG}g</span>
            </span>
          ) : null}
          {recipe.proteinG != null ? (
            <span className="text-mint-400">
              <span className="font-display uppercase tracking-display">Protein</span>{" "}
              <span className="text-white">{recipe.proteinG}g</span>
            </span>
          ) : null}
        </div>
      ) : null}
      {recipe.fuelTags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {recipe.fuelTags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-mint/10 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-mint-400"
            >
              {FUEL_TAG_LABEL[t]}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
