import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { ExerciseCanvas } from "@/components/exercise/ExerciseCanvas";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryFromSlug, categoryMeta } from "@/lib/constants/exercise-categories";
import { MOTION_SPEC_BY_SLUG } from "@/lib/exercise/pilots";
import { ContextToggle } from "@/components/train/ContextToggle";
import { equipmentForExercise, contextLabel } from "@/lib/training-context";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ExerciseDetailPage({ params }: Props) {
  const user = await requirePlayer();
  const { category: categorySlug, slug } = await params;

  const category = categoryFromSlug(categorySlug);
  if (!category) notFound();

  const exercise = await prisma.exercise.findUnique({ where: { slug } });
  if (!exercise || exercise.category !== category) notFound();

  const meta = categoryMeta(category);
  const spec = MOTION_SPEC_BY_SLUG[exercise.slug] ?? null;
  const context = user.player.trainingContext;
  const { equipment, usedContext } = equipmentForExercise(
    context,
    exercise.contexts,
    exercise.equipmentGym,
    exercise.equipmentHome,
  );
  const ctxLabel = contextLabel(usedContext);

  return (
    <AppShell>
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/train/exercise/${meta.slug}`}
              className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint"
            >
              ← {meta.label}
            </Link>
            <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl leading-tight">
              {exercise.name}
            </h1>
          </div>
          <ContextToggle context={context} />
        </div>
      </div>

      <div className="space-y-4 px-5">
        {spec ? (
          <ExerciseCanvas
            spec={spec}
            className="aspect-square w-full overflow-hidden rounded-card bg-ink-900"
          />
        ) : (
          <div
            className="flex aspect-square w-full items-center justify-center rounded-card border border-dashed border-white/10 bg-ink-900/50 text-center"
            aria-label="3D demo placeholder"
            role="img"
          >
            <div className="max-w-[70%]">
              <p className="font-display uppercase tracking-display text-white text-sm">
                3D demo coming soon
              </p>
              <p className="mt-1 text-xs text-muted">
                Animation is authored per exercise. The 4-pilot sign-off gates
                further specs.
              </p>
            </div>
          </div>
        )}

        {exercise.coachingCue ? (
          <Card>
            <CardTitle>Coaching cue</CardTitle>
            <p className="mt-2 text-sm text-muted-strong">{exercise.coachingCue}</p>
          </Card>
        ) : null}

        <Card>
          <CardTitle>Prescription</CardTitle>
          <p className="mt-2 font-display uppercase tracking-display text-white text-lg">
            {exercise.defaultPrescription ?? "As prescribed by your programme"}
          </p>
          <p className="mt-1 text-xs text-muted">
            Starting point — programme sessions carry their own specific reps.
          </p>
        </Card>

        <Card>
          <CardTitle>
            Equipment · {ctxLabel}
          </CardTitle>
          <p className="mt-2 text-sm text-muted-strong">{equipment}</p>
        </Card>

        {exercise.description ? (
          <Card>
            <CardTitle>About</CardTitle>
            <p className="mt-2 text-sm text-muted-strong">{exercise.description}</p>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}
