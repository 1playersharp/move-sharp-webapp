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

// Detail-page variant that accounts for split exercises. If the player's
// active context isn't in the exercise's contexts (someone navigated
// direct to a gym-only exercise while set to Home), fall back to the
// exercise's own primary context so the equipment shown is actually
// relevant to what they're looking at.
export function equipmentForExercise(
  playerContext: TrainingContext,
  contexts: TrainingContext[],
  equipmentGym: string | null,
  equipmentHome: string | null,
): { equipment: string; usedContext: TrainingContext } {
  const use = contexts.includes(playerContext) ? playerContext : (contexts[0] ?? playerContext);
  const value = use === "gym" ? equipmentGym : equipmentHome;
  return {
    equipment: value ?? "Bodyweight",
    usedContext: use,
  };
}
