import type { JointName } from "./humanoid";

// A MotionSpec is a data-driven description of how each named joint moves
// across one rep of the exercise. Values are Euler XYZ rotations in DEGREES
// (converted to radians at apply time). The pelvis track can also drive
// translation via `position` so the humanoid can leave the origin
// (jumps, cuts, sprints).
//
// Keyframe `t` is in [0, 1] — the fraction of one rep. This lets the same
// spec run at any rep duration without re-authoring.

export type Vec3 = [number, number, number];
export type Ease = "linear" | "smooth";

export type Keyframe<T> = {
  t: number;
  value: T;
  ease?: Ease;
};

export type JointTrack = {
  rotationDeg?: Keyframe<Vec3>[];
  // Only meaningful on pelvis — offsets the whole rig in world space.
  position?: Keyframe<Vec3>[];
};

export type MotionSpec = {
  slug: string;
  name: string;
  // Whether to loop reps forever, or play one rep and hold the last frame.
  loop: boolean;
  repDurationSec: number;
  // If loop=true, hold this long between reps at the last frame. Useful
  // for the "stick the landing" pause on a broad jump.
  restBetweenRepsSec?: number;
  tracks: Partial<Record<JointName, JointTrack>>;
};

// Smoothstep — a cheap ease-in-out with no derivatives to think about.
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function ease(t: number, kind: Ease | undefined): number {
  return kind === "smooth" ? smoothstep(t) : t;
}

// Sample a keyframe track at t in [0, 1]. Clamps outside the range.
export function sampleTrack<T extends Vec3>(
  frames: Keyframe<T>[],
  t: number,
  zero: T,
): T {
  if (frames.length === 0) return zero;
  if (t <= frames[0].t) return frames[0].value;
  if (t >= frames[frames.length - 1].t) return frames[frames.length - 1].value;

  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i];
    const b = frames[i + 1];
    if (t >= a.t && t <= b.t) {
      const span = b.t - a.t;
      const local = span === 0 ? 0 : (t - a.t) / span;
      const k = ease(local, b.ease ?? a.ease);
      return [
        a.value[0] + (b.value[0] - a.value[0]) * k,
        a.value[1] + (b.value[1] - a.value[1]) * k,
        a.value[2] + (b.value[2] - a.value[2]) * k,
      ] as T;
    }
  }
  return frames[frames.length - 1].value;
}

// Normalizes wall-clock elapsed seconds into rep-local t in [0, 1] and
// reports which rep we're on (useful for A-skip's left/right alternation).
export function timeToRepT(
  elapsedSec: number,
  spec: MotionSpec,
): { t: number; repIndex: number } {
  const cycle = spec.repDurationSec + (spec.restBetweenRepsSec ?? 0);
  if (!spec.loop) {
    const t = Math.min(elapsedSec / spec.repDurationSec, 1);
    return { t, repIndex: 0 };
  }
  const modTime = ((elapsedSec % cycle) + cycle) % cycle;
  if (modTime <= spec.repDurationSec) {
    return {
      t: modTime / spec.repDurationSec,
      repIndex: Math.floor(elapsedSec / cycle),
    };
  }
  // In the "rest between reps" window — hold the last frame.
  return {
    t: 1,
    repIndex: Math.floor(elapsedSec / cycle),
  };
}
