import { coachClipForSlug } from "./coach-clips";
import type { MotionSpec } from "./motion-spec";

// True when ExerciseDemo has something real to render — a captured 3D Coach
// clip or a procedural pilot — rather than the "coming soon" placeholder.
// Screens that offer the demo behind a toggle use this to hide the toggle.
export function hasExerciseDemo(slug: string, spec?: MotionSpec | null): boolean {
  return coachClipForSlug(slug) !== null || Boolean(spec);
}
