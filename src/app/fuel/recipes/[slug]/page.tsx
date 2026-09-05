import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle } from "@/components/ui/Card";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ALLERGEN_LABEL, FUEL_TAG_LABEL } from "@/lib/fuel/rails";

type Ingredient = { name: string; quantity: string; note?: string };

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RecipeDetailPage({ params }: Props) {
  const user = await requirePlayer();
  const playerAllergies = new Set(user.player.allergies);
  const { slug } = await params;

  const recipe = await prisma.recipe.findUnique({ where: { slug } });
  if (!recipe) notFound();

  // Locked decision: hard exclusion. If the recipe contains an allergen
  // the player has flagged, treat as not-found rather than showing with
  // a warning — matches the browse/search behaviour so the URL surface
  // is consistent. Same treatment for diet mismatch.
  const conflictingAllergens = recipe.allergens.filter((a) => playerAllergies.has(a));
  if (conflictingAllergens.length > 0) notFound();
  if (!recipe.dietSuitability.includes(user.player.dietPreference)) notFound();

  const ingredients = (recipe.ingredients ?? []) as unknown as Ingredient[];

  return (
    <AppShell>
      <Header
        back={{ href: "/fuel/recipes", label: "Recipes" }}
        title={recipe.name}
        subtitle={`Serves ${recipe.servings}`}
      >
        <div className="mt-3 flex flex-wrap gap-1.5">
          {recipe.fuelTags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-mint/10 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-mint-400"
            >
              {FUEL_TAG_LABEL[t]}
            </span>
          ))}
        </div>
      </Header>

      <div className="space-y-4 shell-gutter pb-6">
        <Card>
          <CardTitle>Ingredients</CardTitle>
          <ul className="mt-3 space-y-2">
            {ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <span className="text-sm text-white">
                  {ing.name}
                  {ing.note ? (
                    <span className="ml-1 text-xs text-muted">({ing.note})</span>
                  ) : null}
                </span>
                <span className="shrink-0 text-xs text-muted-strong">{ing.quantity}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>Method</CardTitle>
          <p className="mt-3 whitespace-pre-line text-sm text-muted-strong">
            {recipe.instructions}
          </p>
        </Card>

        {recipe.allergens.length > 0 ? (
          <Card>
            <CardTitle>Allergens</CardTitle>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recipe.allergens.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-yellow-500/30 bg-yellow-500/5 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-yellow-200"
                >
                  {ALLERGEN_LABEL[a]}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              Allergen tags are a shortcut, not a substitute for reading the
              actual label on every ingredient.
            </p>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}
