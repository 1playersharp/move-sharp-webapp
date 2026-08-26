import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  MEAL_SLOTS,
  SLOT_LABEL,
  dateKey,
  dayShort,
  monthDay,
  nextNDays,
} from "@/lib/fuel/planner";
import { unpinRecipeFromPlan } from "@/app/actions/mealPlan";

export default async function PlannerPage() {
  const user = await requirePlayer();

  const days = nextNDays(7);
  const rangeStart = days[0];
  const rangeEnd = days[days.length - 1];
  // rangeEnd is midnight UTC of day 7 — include the full day by using
  // `lt` against day 8 (or `lte` at end-of-day). Simpler: query lte.
  const entries = await prisma.mealPlanEntry.findMany({
    where: {
      playerId: user.player.id,
      date: { gte: rangeStart, lte: rangeEnd },
    },
    include: {
      recipe: {
        select: { slug: true, name: true, carbsG: true, proteinG: true },
      },
    },
    orderBy: [{ date: "asc" }, { slot: "asc" }],
  });

  // Bucket by date+slot for O(1) lookup during render.
  const byCell = new Map<string, (typeof entries)[number]>();
  for (const e of entries) {
    byCell.set(`${dateKey(e.date)}|${e.slot}`, e);
  }

  const todayKey = dateKey(new Date());

  return (
    <AppShell>
      <Header
        title="Planner"
        subtitle="Pin recipes to the next seven days."
      />

      <div className="space-y-4 px-5 pb-6">
        <div className="flex items-baseline justify-between">
          <p className="text-xs text-muted">
            {entries.length} meal{entries.length === 1 ? "" : "s"} planned
          </p>
          <Link
            href="/fuel/recipes"
            className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint"
          >
            Browse recipes →
          </Link>
        </div>

        <ol className="space-y-3">
          {days.map((d) => {
            const dKey = dateKey(d);
            const isToday = dKey === todayKey;
            return (
              <li key={dKey}>
                <div className="rounded-card border border-white/5 bg-ink-850 shadow-card">
                  <div
                    className={`flex items-baseline justify-between border-b border-white/5 px-4 py-3 ${
                      isToday ? "bg-mint/5" : ""
                    }`}
                  >
                    <div>
                      <p className="font-display uppercase tracking-display text-white text-base">
                        {dayShort(d)}
                        {isToday ? (
                          <span className="ml-2 rounded-full bg-mint/20 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-mint-400">
                            Today
                          </span>
                        ) : null}
                      </p>
                      <p className="text-xs text-muted">{monthDay(d)}</p>
                    </div>
                  </div>
                  <ul className="divide-y divide-white/5">
                    {MEAL_SLOTS.map((slot) => {
                      const entry = byCell.get(`${dKey}|${slot}`);
                      return (
                        <li key={slot} className="px-4 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
                                {SLOT_LABEL[slot]}
                              </p>
                              {entry ? (
                                <div className="mt-1">
                                  <Link
                                    href={`/fuel/recipes/${entry.recipe.slug}`}
                                    className="text-sm text-white hover:text-mint"
                                  >
                                    {entry.recipe.name}
                                  </Link>
                                  {entry.recipe.carbsG != null || entry.recipe.proteinG != null ? (
                                    <p className="mt-0.5 text-[0.7rem] text-muted">
                                      {entry.recipe.carbsG != null ? `${entry.recipe.carbsG}g carbs` : null}
                                      {entry.recipe.carbsG != null && entry.recipe.proteinG != null ? " · " : null}
                                      {entry.recipe.proteinG != null ? `${entry.recipe.proteinG}g protein` : null}
                                    </p>
                                  ) : null}
                                </div>
                              ) : (
                                <p className="mt-1 text-xs text-muted-strong italic">
                                  Nothing planned
                                </p>
                              )}
                            </div>
                            <div className="flex shrink-0 gap-1.5">
                              {entry ? (
                                <>
                                  <Link
                                    href={`/fuel/planner/add?date=${dKey}&slot=${slot}`}
                                    className="rounded-full border border-white/10 px-2.5 py-1 font-display uppercase tracking-display text-[0.6rem] text-muted hover:border-mint hover:text-mint"
                                  >
                                    Swap
                                  </Link>
                                  <form action={unpinRecipeFromPlan}>
                                    <input type="hidden" name="id" value={entry.id} />
                                    <button
                                      type="submit"
                                      className="rounded-full border border-white/10 px-2.5 py-1 font-display uppercase tracking-display text-[0.6rem] text-muted hover:border-red-500/50 hover:text-red-300"
                                    >
                                      Remove
                                    </button>
                                  </form>
                                </>
                              ) : (
                                <Link
                                  href={`/fuel/planner/add?date=${dKey}&slot=${slot}`}
                                  className="rounded-full bg-mint px-2.5 py-1 font-display uppercase tracking-display text-[0.6rem] text-ink-950 hover:bg-mint-400"
                                >
                                  + Pin
                                </Link>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </AppShell>
  );
}
