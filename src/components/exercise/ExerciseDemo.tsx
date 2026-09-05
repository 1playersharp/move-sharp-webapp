import { CoachCanvas } from "./CoachCanvas";
import { ExerciseCanvas } from "./ExerciseCanvas";
import { coachClipForSlug } from "@/lib/exercise/coach-clips";
import type { MotionSpec } from "@/lib/exercise/motion-spec";
import { cn } from "@/lib/cn";

type Props = {
  slug: string;
  name: string;
  /** Procedural fallback for exercises the 3D Coach has no clip for. */
  spec?: MotionSpec | null;
  className?: string;
};

// Picks the best demo available for an exercise: a motion-captured 3D Coach
// clip where one exists, otherwise the procedural pilot, otherwise a
// placeholder. One component so every screen makes the same choice.
export function ExerciseDemo({ slug, name, spec, className }: Props) {
  const clipName = coachClipForSlug(slug);

  if (clipName) {
    return <CoachCanvas clipName={clipName} label={name} className={className} />;
  }

  if (spec) {
    return <ExerciseCanvas spec={spec} className={className} />;
  }

  return (
    <div
      className={cn(
        "flex aspect-square w-full max-w-[30rem] items-center justify-center rounded-card border border-dashed border-white/10 bg-ink-900/50 text-center",
        className,
      )}
      aria-label="3D demo placeholder"
      role="img"
    >
      <div className="max-w-[70%]">
        <p className="font-display uppercase tracking-display text-white text-sm">
          3D demo coming soon
        </p>
        <p className="mt-1 text-xs text-muted">
          Animation is captured per exercise — this one hasn&apos;t been recorded yet.
        </p>
      </div>
    </div>
  );
}
