// The 3D Coach model: a single Mixamo rig carrying every exercise clip,
// built from the raw exports by scripts/build-coach-glb.mjs.
//
// Clips are keyed by name inside the GLB (the raw Mixamo exports all ship
// as "mixamo.com", so the build step renames them to these).

export const COACH_MODEL_URL = "/models/coach.glb";

export const COACH_CLIPS = [
  "back-squat",
  "bicycle-situps",
  "box-jumps",
  "burpees",
  "jumping-jacks",
  "kettlebell-swing",
  "pike-walkout",
  "standing-pistol",
  "plank",
  "situps",
  "bodyweight-squat",
] as const;

export type CoachClip = (typeof COACH_CLIPS)[number];

// Library slug → clip. Deliberately conservative: a clip is only mapped
// where it shows the movement the exercise actually names. Showing a back
// squat under "goblet squat" would teach the wrong shape, so unmapped
// exercises fall back to the procedural MotionSpec pilots instead.
export const COACH_CLIP_BY_SLUG: Partial<Record<string, CoachClip>> = {
  "bodyweight-squat": "bodyweight-squat",
  "barbell-back-squat": "back-squat",
  "box-jump-gym": "box-jumps",
  "step-jump-home": "box-jumps",
  burpee: "burpees",
  "jumping-jack": "jumping-jacks",
  plank: "plank",
  "sit-up": "situps",
  "pike-walkout": "pike-walkout",
  "standing-pistol": "standing-pistol",
  "bicycle-situp": "bicycle-situps",
};

export function coachClipForSlug(slug: string): CoachClip | null {
  return COACH_CLIP_BY_SLUG[slug] ?? null;
}

// Human-readable names for the sandbox / sign-off screen.
export const COACH_CLIP_LABELS: Record<CoachClip, string> = {
  "back-squat": "Back squat",
  "bicycle-situps": "Bicycle sit-ups",
  "box-jumps": "Box jumps",
  burpees: "Burpees",
  "jumping-jacks": "Jumping jacks",
  "kettlebell-swing": "Kettlebell swing",
  "pike-walkout": "Pike walkout",
  "standing-pistol": "Standing pistol squat",
  plank: "Plank",
  situps: "Sit-ups",
  "bodyweight-squat": "Bodyweight squat",
};
