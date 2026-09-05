import { notFound } from "next/navigation";
import type { MealSlot } from "@prisma/client";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pinRecipeToPlan } from "@/app/actions/mealPlan";
import { SLOT_LABEL, monthDay } from "@/lib/fuel/planner";
import { FUEL_TAG_LABEL } from "@/lib/fuel/rails";

const VALID_SLOTS = new Set<MealSlot>(["breakfast", "lunch", "dinner", "snack"]);

type Props = {
  searchParams: Promise<{ date?: string; slot?: string }>;
};

export default async function AddToPlannerPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const { date: dateRaw, slot: slotRaw } = await searchParams;

  if (!dateRaw || !/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) notFound();
  if (!slotRaw || !VALID_SLOTS.has(slotRaw as MealSlot)) notFound();
  const slot = slotRaw as MealSlot;

  // Apply the same allergy + diet hard-exclusion as /fuel/recipes so
  // players can't pin something their profile says they can't eat.
  const recipes = await prisma.recipe.findMany({
    where: {
      ...(user.player.allergies.length
        ? { NOT: { allergens: { hasSome: user.player.allergies } } }
        : {}),
      dietSuitability: { has: user.player.dietPreference },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      fuelTags: true,
    },
    orderBy: { name: "asc" },
  });

  const dateLabel = monthDay(new Date(`${dateRaw}T00:00:00.000Z`));

  return (
    <AppShell>
      <Header
        back={{ href: "/fuel/planner", label: "Planner" }}
        title="Pin a recipe"
        subtitle={`${SLOT_LABEL[slot]} · ${dateLabel}`}
      />

      <div className="space-y-3 shell-gutter pb-6">
        {recipes.length === 0 ? (
          <EmptyState
            title="No recipes match your filters"
            body="Try loosening your allergy or diet settings first."
          />
        ) : (
          <ul className="space-y-2">
            {recipes.map((r) => (
              <li key={r.id}>
                <form action={pinRecipeToPlan}>
                  <input type="hidden" name="date" value={dateRaw} />
                  <input type="hidden" name="slot" value={slot} />
                  <input type="hidden" name="recipeId" value={r.id} />
                  <button
                    type="submit"
                    className="group flex w-full items-start justify-between gap-3 rounded-card border border-white/5 bg-ink-850 p-3 text-left shadow-card hover:border-brand"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display uppercase tracking-display text-white text-sm leading-tight group-hover:text-brand">
                        {r.name}
                      </p>
                      {r.fuelTags.length > 0 ? (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {r.fuelTags.map((t) => {
                            const label = FUEL_TAG_LABEL[t];
                            if (!label) return null;
                            return (
                              <span
                                key={t}
                                className="rounded-full bg-brand/10 px-1.5 py-0.5 font-display uppercase tracking-display text-[0.55rem] text-brand-400"
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 rounded-full bg-brand/20 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-brand-400 group-hover:bg-brand group-hover:text-ink-950"
                    >
                      + Pin
                    </span>
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
