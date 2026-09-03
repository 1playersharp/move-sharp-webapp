import type { MotionSpec, Keyframe, Vec3 } from "../motion-spec";

// Core and anti-rotation work. These are the easiest movements in the library
// to author — little or no travel, and most of the coaching point is a
// position held well rather than a range covered.
//
// Convention (see humanoid.ts): forward is -Z. Positive X on a hip or shoulder
// swings the limb forward; positive X on the spine or neck tips the torso
// BACKWARD, because the torso extends +Y. Lean forward with negative spine X.

const kf = (frames: Array<[number, number, number, number]>): Keyframe<Vec3>[] =>
  frames.map(([t, x, y, z]) => ({ t, value: [x, y, z] as Vec3, ease: "smooth" }));

// ---- Side plank ------------------------------------------------------------
// Held on one forearm, body in a line. The whole rig rolls onto its side via
// pelvis Z rotation, so the "movement" is the lift into position and the hold.
export const sidePlank: MotionSpec = {
  slug: "side-plank",
  name: "Side Plank",
  loop: true,
  repDurationSec: 3.0,
  restBetweenRepsSec: 2.0,
  tracks: {
    // Roll onto the left side and drop to forearm height.
    pelvis: {
      rotationDeg: kf([[0, 0, 0, -78], [0.3, 0, 0, -90], [1, 0, 0, -90]]),
      position: kf([[0, 0, -0.45, 0], [0.3, 0, -0.36, 0], [1, 0, -0.36, 0]]),
    },
    // Hips sag at the start, then drive up into a straight line — the point
    // of the exercise.
    spine: { rotationDeg: kf([[0, 0, 0, 10], [0.35, 0, 0, -4], [1, 0, 0, -4]]) },
    // Bottom arm props the body up; top arm rests on the hip.
    shoulderL: { rotationDeg: kf([[0, 95, 0, 0], [1, 95, 0, 0]]) },
    elbowL: { rotationDeg: kf([[0, 95, 0, 0], [1, 95, 0, 0]]) },
    shoulderR: { rotationDeg: kf([[0, 10, 0, -8], [1, 10, 0, -8]]) },
    elbowR: { rotationDeg: kf([[0, 20, 0, 0], [1, 20, 0, 0]]) },
    // Legs stacked and straight.
    hipL: { rotationDeg: kf([[0, 0, 0, 4], [1, 0, 0, 4]]) },
    hipR: { rotationDeg: kf([[0, 0, 0, -4], [1, 0, 0, -4]]) },
  },
};

// ---- Deadbug ---------------------------------------------------------------
// On the back, opposite arm and leg extend while the lower back stays flat.
// Alternates sides across one rep.
export const deadbug: MotionSpec = {
  slug: "deadbug",
  name: "Deadbug",
  loop: true,
  repDurationSec: 3.2,
  tracks: {
    // Lying supine: rotate back 90° and drop to floor height.
    pelvis: {
      rotationDeg: kf([[0, 90, 0, 0], [1, 90, 0, 0]]),
      position: kf([[0, 0, -0.78, 0], [1, 0, -0.78, 0]]),
    },
    spine: { rotationDeg: kf([[0, 0, 0, 0], [1, 0, 0, 0]]) },
    // Start: both knees and hips at 90°, arms straight up.
    // Then left arm + right leg extend, return, and the other pair goes.
    hipL: { rotationDeg: kf([[0, 90, 0, 0], [0.25, 90, 0, 0], [0.5, 20, 0, 0], [0.75, 90, 0, 0], [1, 90, 0, 0]]) },
    kneeL: { rotationDeg: kf([[0, -90, 0, 0], [0.25, -90, 0, 0], [0.5, -15, 0, 0], [0.75, -90, 0, 0], [1, -90, 0, 0]]) },
    hipR: { rotationDeg: kf([[0, 90, 0, 0], [0.25, 20, 0, 0], [0.5, 90, 0, 0], [1, 90, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -90, 0, 0], [0.25, -15, 0, 0], [0.5, -90, 0, 0], [1, -90, 0, 0]]) },
    // Arms vertical at rest, dropping overhead opposite the working leg.
    shoulderR: { rotationDeg: kf([[0, 90, 0, 0], [0.25, 90, 0, 0], [0.5, 165, 0, 0], [0.75, 90, 0, 0], [1, 90, 0, 0]]) },
    shoulderL: { rotationDeg: kf([[0, 90, 0, 0], [0.25, 165, 0, 0], [0.5, 90, 0, 0], [1, 90, 0, 0]]) },
  },
};

// ---- Pallof press ----------------------------------------------------------
// Anti-rotation: the band pulls sideways, the press resists the twist. Built
// once and reused for the gym and home entries, which differ only in kit.
function pallof(slug: string, name: string, anchorX: number): MotionSpec {
  return {
    slug,
    name,
    loop: true,
    repDurationSec: 2.8,
    props: [{ kind: "band", anchor: [anchorX, 1.05, 0], grip: "both" }],
    tracks: {
      // Side-on to the anchor, braced. A little counter-lean away from it.
      pelvis: { rotationDeg: kf([[0, 0, -90, 0], [1, 0, -90, 0]]) },
      spine: { rotationDeg: kf([[0, -4, 0, 3], [0.5, -4, 0, 5], [1, -4, 0, 3]]) },
      // Hands start at the chest and press straight out, then return.
      shoulderL: { rotationDeg: kf([[0, 72, 0, -14], [0.45, 88, 0, -6], [0.6, 88, 0, -6], [1, 72, 0, -14]]) },
      shoulderR: { rotationDeg: kf([[0, 72, 0, 14], [0.45, 88, 0, 6], [0.6, 88, 0, 6], [1, 72, 0, 14]]) },
      elbowL: { rotationDeg: kf([[0, 105, 0, 0], [0.45, 8, 0, 0], [0.6, 8, 0, 0], [1, 105, 0, 0]]) },
      elbowR: { rotationDeg: kf([[0, 105, 0, 0], [0.45, 8, 0, 0], [0.6, 8, 0, 0], [1, 105, 0, 0]]) },
      // Athletic stance, knees soft.
      hipL: { rotationDeg: kf([[0, 12, 0, 3], [1, 12, 0, 3]]) },
      hipR: { rotationDeg: kf([[0, 12, 0, -3], [1, 12, 0, -3]]) },
      kneeL: { rotationDeg: kf([[0, -18, 0, 0], [1, -18, 0, 0]]) },
      kneeR: { rotationDeg: kf([[0, -18, 0, 0], [1, -18, 0, 0]]) },
    },
  };
}

export const pallofPressGym = pallof("pallof-press-gym", "Pallof Press", 1.5);
export const pallofPressHome = pallof("pallof-press-home", "Band Pallof Press", 1.5);

export const CORE_SPECS: MotionSpec[] = [sidePlank, deadbug, pallofPressGym, pallofPressHome];
