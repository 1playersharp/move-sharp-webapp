import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryFromSlug, categoryMeta } from "@/lib/constants/exercise-categories";

type Props = { params: Promise<{ category: string }> };

export default async function CategoryExercisesPage({ params }: Props) {
  await requirePlayer();
  const { category: categorySlug } = await params;
  const category = categoryFromSlug(categorySlug);
  if (!category) notFound();

  const meta = categoryMeta(category);

  const exercises = await prisma.exercise.findMany({
    where: { category },
    orderBy: [{ name: "asc" }],
  });

  return (
    <AppShell>
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <Link
          href="/train/exercise"
          className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint"
        >
          ← Exercise
        </Link>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl leading-tight">
          {meta.label}
        </h1>
        <p className="mt-1 text-sm text-muted">{meta.blurb}</p>
      </div>

      <div className="space-y-2 px-5">
        {exercises.length === 0 ? (
          <p className="text-sm text-muted">No exercises yet in this category.</p>
        ) : (
          exercises.map((e) => (
            <Link
              key={e.id}
              href={`/train/exercise/${meta.slug}/${e.slug}`}
              className="group flex items-start justify-between gap-3 rounded-card border border-white/5 bg-ink-850 p-4 shadow-card transition-colors hover:border-mint/30"
            >
              <div className="min-w-0">
                <h3 className="font-display uppercase tracking-display text-white text-base leading-tight">
                  {e.name}
                </h3>
                {e.coachingCue ? (
                  <p className="mt-1 text-xs text-muted-strong line-clamp-2">
                    {e.coachingCue}
                  </p>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-1.5 text-[0.6rem] uppercase tracking-display font-display">
                  {e.equipmentHome ? (
                    <span className="rounded-full border border-white/10 bg-ink-800 px-2 py-0.5 text-muted">
                      Home
                    </span>
                  ) : null}
                  {e.equipmentGym ? (
                    <span className="rounded-full border border-white/10 bg-ink-800 px-2 py-0.5 text-muted">
                      Gym
                    </span>
                  ) : null}
                </div>
              </div>
              <span aria-hidden="true" className="shrink-0 self-center text-lg text-muted group-hover:text-white">
                ›
              </span>
            </Link>
          ))
        )}
      </div>
    </AppShell>
  );
}
