import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { ModeToggle } from "@/components/train/ModeToggle";
import { ContextToggle } from "@/components/train/ContextToggle";
import { EXERCISE_CATEGORIES } from "@/lib/constants/exercise-categories";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ExerciseCategoriesPage() {
  const user = await requirePlayer();
  const context = user.player.trainingContext;

  // Count only exercises available in the active context — the toggle
  // choice ripples through the category counts too.
  const rawCounts = await prisma.exercise.groupBy({
    by: ["category"],
    where: { contexts: { has: context } },
    _count: { _all: true },
  });
  const countByCategory = new Map(rawCounts.map((r) => [r.category, r._count._all] as const));

  return (
    <AppShell>
      <Header
        title="Train"
        subtitle="Browse by exercise category."
        right={<ContextToggle context={context} />}
      />
      <div className="space-y-6 shell-gutter">
        <ModeToggle mode="exercise" />

        <div className="space-y-3">
          {EXERCISE_CATEGORIES.map((c) => {
            const count = countByCategory.get(c.key) ?? 0;
            return (
              <Link
                key={c.key}
                href={`/train/exercise/${c.slug}`}
                className="group flex items-start justify-between gap-3 rounded-card border border-white/5 bg-ink-850 p-4 shadow-card transition-colors hover:border-mint/30"
              >
                <div className="min-w-0">
                  <h3 className="font-display uppercase tracking-display text-white text-base leading-tight">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{c.blurb}</p>
                </div>
                <div className="shrink-0 self-center text-right">
                  <span className="font-display uppercase tracking-display text-[0.65rem] text-mint-400">
                    {count} {count === 1 ? "exercise" : "exercises"}
                  </span>
                  <span aria-hidden="true" className="ml-1 text-muted group-hover:text-white">
                    ›
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
