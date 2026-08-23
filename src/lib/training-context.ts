import type { TrainingContext } from "@prisma/client";

// Returns the equipment string appropriate for the current context, or
// "Bodyweight" when the exercise/session has no specific requirement.
export function equipmentForContext(
  context: TrainingContext,
  equipmentGym: string | null,
  equipmentHome: string | null,
): string {
  const value = context === "gym" ? equipmentGym : equipmentHome;
  return value ?? "Bodyweight";
}

// Returns the cue string appropriate for the current context. Falls back
// to the other context's cue if only that side is authored, so nothing is
// hidden when the two paths don't materially differ.
export function cueForContext(
  context: TrainingContext,
  gymCue: string | null | undefined,
  homeCue: string | null | undefined,
): string | null {
  if (context === "gym") return gymCue ?? homeCue ?? null;
  return homeCue ?? gymCue ?? null;
}

export function contextLabel(context: TrainingContext): "Home" | "Gym" {
  return context === "gym" ? "Gym" : "Home";
}
