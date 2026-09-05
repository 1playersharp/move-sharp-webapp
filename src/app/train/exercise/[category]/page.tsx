import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryFromSlug, categoryMeta } from "@/lib/constants/exercise-categories";
import { ContextToggle } from "@/components/train/ContextToggle";
import { equipmentForContext, contextLabel } from "@/lib/training-context";

type Props = { params: Promise<{ category: string }> };

export default async function CategoryExercisesPage({ params }: Props) {
  const user = await requirePlayer();
  const { category: categorySlug } = await params;
  const category = categoryFromSlug(categorySlug);
  if (!category) notFound();

  const meta = categoryMeta(category);
  const context = user.player.trainingContext;
  const ctxLabel = contextLabel(context);

  const exercises = await prisma.exercise.findMany({
    where: { category, contexts: { has: context } },
    orderBy: [{ name: "asc" }],
  });

  return (
    <AppShell>
      <Header
        back={{ href: "/train/exercise", label: "Exercise" }}
        title={meta.label}
        subtitle={meta.blurb}
        right={<ContextToggle context={context} />}
      />

      <div className="space-y-2 shell-gutter">
        {exercises.length === 0 ? (
          <p className="text-sm text-muted">No exercises yet in this category.</p>
        ) : (
          exercises.map((e) => {
            const equipment = equipmentForContext(context, e.equipmentGym, e.equipmentHome);
            return (
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
                  <p className="mt-2 text-[0.65rem] uppercase tracking-display font-display text-muted">
                    <span className="text-mint-400">{ctxLabel}</span> · {equipment}
                  </p>
                </div>
                <span aria-hidden="true" className="shrink-0 self-center text-lg text-muted group-hover:text-white">
                  ›
                </span>
              </Link>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
