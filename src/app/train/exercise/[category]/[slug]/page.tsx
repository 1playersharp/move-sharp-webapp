import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle } from "@/components/ui/Card";
import { ExerciseDemo } from "@/components/exercise/ExerciseDemo";
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
      <Header
        back={{ href: `/train/exercise/${meta.slug}`, label: meta.label }}
        title={exercise.name}
        right={<ContextToggle context={context} />}
      />

      <div className="space-y-4 shell-gutter">
        <ExerciseDemo slug={exercise.slug} name={exercise.name} spec={spec} />

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
