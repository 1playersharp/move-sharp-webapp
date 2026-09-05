import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FUEL_RAILS } from "@/lib/fuel/rails";
import { RecipeCard } from "@/components/fuel/RecipeCard";
import { HydrationCards } from "@/components/fuel/HydrationCards";

export default async function FuelPage() {
  const user = await requirePlayer();
  const playerAllergies = user.player.allergies;
  const dietPreference = user.player.dietPreference;

  // Hard-exclusion allergy filter (locked) + diet preference filter.
  // Recipes list every diet they're suitable for; we require the
  // player's diet to appear in that list.
  const recipes = await prisma.recipe.findMany({
    where: {
      ...(playerAllergies.length
        ? { NOT: { allergens: { hasSome: playerAllergies } } }
        : {}),
      dietSuitability: { has: dietPreference },
    },
    select: {
      slug: true,
      name: true,
      servings: true,
      fuelTags: true,
    },
    orderBy: { name: "asc" },
  });

  const byTag = new Map<string, typeof recipes>();
  for (const r of recipes) {
    for (const t of r.fuelTags) {
      if (!byTag.has(t)) byTag.set(t, []);
      byTag.get(t)!.push(r);
    }
  }

  return (
    <AppShell>
      <Header
        title="Fuel"
        subtitle="Rails, recipes, and enough to train hard."
      />

      <div className="space-y-6 shell-gutter pb-6">
        {playerAllergies.length > 0 ? (
          <div className="rounded-md border border-brand/20 bg-brand/5 p-3 text-xs text-brand-400">
            Filtered by your allergies. Always double-check ingredients yourself
            — recipe tagging is a shortcut, not a replacement for reading the
            label.
          </div>
        ) : null}

        <div className="flex gap-2">
          <Link
            href="/fuel/planner"
            className="group flex-1 rounded-card border border-brand/40 bg-brand/5 p-4 shadow-card hover:border-brand"
          >
            <p className="font-display uppercase tracking-display text-white text-base leading-tight">
              Planner
            </p>
            <p className="mt-1 text-xs text-muted">
              Pin recipes across the next seven days
            </p>
          </Link>
          <Link
            href="/fuel/recipes"
            className="group flex-1 rounded-card border border-white/5 bg-ink-850 p-4 shadow-card hover:border-brand"
          >
            <p className="font-display uppercase tracking-display text-white text-base leading-tight">
              Recipes
            </p>
            <p className="mt-1 text-xs text-muted">
              Browse the full library
            </p>
          </Link>
        </div>

        <HydrationCards />

        {FUEL_RAILS.map((rail) => {
          const items = (byTag.get(rail.tag) ?? []).slice(0, 3);
          return (
            <section key={rail.tag} className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-display uppercase tracking-display text-white text-lg">
                  {rail.title}
                </h2>
                {items.length > 0 ? (
                  <Link
                    href={`/fuel/recipes?tag=${rail.tag}`}
                    className="text-[0.7rem] font-display uppercase tracking-display text-brand-400 hover:text-brand"
                  >
                    See all →
                  </Link>
                ) : null}
              </div>
              <p className="text-xs text-muted-strong">{rail.blurb}</p>
              {items.length === 0 ? (
                <EmptyState
                  title="Nothing here for you"
                  body="No recipes match this rail with your current allergy filter."
                />
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {items.map((r) => (
                    <RecipeCard key={r.slug} recipe={r} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
