import type { MotionSpec, Keyframe, SceneProp, Vec3 } from "../motion-spec";

// Rotational power and the mobility flow.
//
// These turn the whole trunk, which is where the spec system is weakest: the
// tracks are Euler angles and big simultaneous Y and X rotation on the spine
// starts to gimbal. Keeping the twist mostly on pelvis Y (the heading) and
// leaving the spine to lean keeps them well clear of that.

const kf = (frames: Array<[number, number, number, number]>): Keyframe<Vec3>[] =>
  frames.map(([t, x, y, z]) => ({ t, value: [x, y, z] as Vec3, ease: "smooth" }));

// ---- Rotational med ball throw ---------------------------------------------
// Side-on to a wall: load the back hip, then sequence hips → chest → arms.
export const rotationalThrow: MotionSpec = {
  slug: "rotational-med-ball-throw",
  name: "Rotational Med Ball Throw",
  loop: true,
  repDurationSec: 2.4,
  restBetweenRepsSec: 1.2,
  props: [
    { kind: "wall", z: -1.4, width: 2.4, height: 2.4 },
    { kind: "chest_weight", size: 0.18 },
  ],
  tracks: {
    // Start side-on, wind away from the wall, then whip through and face it.
    // The hips lead by a beat — that's the coaching point.
    pelvis: {
      rotationDeg: kf([[0, 0, -74, 0], [0.35, 0, -96, 0], [0.55, 0, -20, 0], [0.7, 0, -6, 0], [1, 0, -74, 0]]),
      position: kf([[0, 0, -0.04, 0], [0.35, 0, -0.1, 0], [0.6, 0, 0, 0], [1, 0, -0.04, 0]]),
    },
    // Torso follows the hips, then extends through the throw.
    spine: { rotationDeg: kf([[0, -6, 0, 0], [0.35, -14, 0, 0], [0.6, -4, 0, 0], [1, -6, 0, 0]]) },
    // Arms carry the ball across the body and release toward the wall.
    shoulderL: { rotationDeg: kf([[0, 62, 0, -18], [0.35, 48, 0, -26], [0.6, 92, 0, -10], [1, 62, 0, -18]]) },
    shoulderR: { rotationDeg: kf([[0, 62, 0, 18], [0.35, 48, 0, 26], [0.6, 92, 0, 10], [1, 62, 0, 18]]) },
    elbowL: { rotationDeg: kf([[0, 74, 0, 0], [0.35, 88, 0, 0], [0.6, 14, 0, 0], [1, 74, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 74, 0, 0], [0.35, 88, 0, 0], [0.6, 14, 0, 0], [1, 74, 0, 0]]) },
    // Back hip loads, then drives through.
    hipL: { rotationDeg: kf([[0, 10, 0, 3], [0.35, 22, 0, 3], [0.6, 4, 0, 3], [1, 10, 0, 3]]) },
    hipR: { rotationDeg: kf([[0, 10, 0, -3], [0.35, 26, 0, -3], [0.6, 2, 0, -3], [1, 10, 0, -3]]) },
    kneeL: { rotationDeg: kf([[0, -18, 0, 0], [0.35, -32, 0, 0], [0.6, -10, 0, 0], [1, -18, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -18, 0, 0], [0.35, -34, 0, 0], [0.6, -8, 0, 0], [1, -18, 0, 0]]) },
  },
};

// ---- Woodchop --------------------------------------------------------------
// Diagonal chop from high on one side to low on the other. The ribs stay down;
// the arms travel, the spine doesn't.
function woodchop(slug: string, name: string, props: SceneProp[]): MotionSpec {
  return {
    slug,
    name,
    loop: true,
    repDurationSec: 2.8,
    props,
    tracks: {
      pelvis: {
        rotationDeg: kf([[0, 0, -28, 0], [0.5, 0, 20, 0], [1, 0, -28, 0]]),
        position: kf([[0, 0, 0, 0], [0.5, 0, -0.14, 0], [1, 0, 0, 0]]),
      },
      // A little lean into the low end of the chop, no twisting through it.
      spine: { rotationDeg: kf([[0, 2, 0, -6], [0.5, -16, 0, 8], [1, 2, 0, -6]]) },
      // Arms sweep high-to-low across the body, elbows near-straight.
      shoulderL: { rotationDeg: kf([[0, 150, 0, -16], [0.5, 24, 0, 10], [1, 150, 0, -16]]) },
      shoulderR: { rotationDeg: kf([[0, 150, 0, -4], [0.5, 24, 0, 20], [1, 150, 0, -4]]) },
      elbowL: { rotationDeg: kf([[0, 16, 0, 0], [0.5, 8, 0, 0], [1, 16, 0, 0]]) },
      elbowR: { rotationDeg: kf([[0, 16, 0, 0], [0.5, 8, 0, 0], [1, 16, 0, 0]]) },
      hipL: { rotationDeg: kf([[0, 6, 0, 4], [0.5, 26, 0, 4], [1, 6, 0, 4]]) },
      hipR: { rotationDeg: kf([[0, 6, 0, -4], [0.5, 26, 0, -4], [1, 6, 0, -4]]) },
      kneeL: { rotationDeg: kf([[0, -10, 0, 0], [0.5, -40, 0, 0], [1, -10, 0, 0]]) },
      kneeR: { rotationDeg: kf([[0, -10, 0, 0], [0.5, -40, 0, 0], [1, -10, 0, 0]]) },
    },
  };
}

export const woodchopGym = woodchop("woodchop-gym", "DB Woodchop", [{ kind: "held_weight", side: "R", size: 0.13 }]);
export const woodchopHome = woodchop("woodchop-home", "Band Woodchop", [
  { kind: "band", anchor: [-1.5, 2.0, 0], grip: "both" },
]);

// ---- Mobility flow ---------------------------------------------------------
// A slow sequence rather than a rep: hip hinge, deep squat, reach tall. Long
// and unhurried on purpose — the coaching point is that slow beats fast.
export const mobilityFlow: MotionSpec = {
  slug: "mobility-flow",
  name: "Mobility Flow",
  loop: true,
  repDurationSec: 8.0,
  tracks: {
    pelvis: {
      position: kf([[0, 0, 0, 0], [0.25, 0, -0.08, 0.12], [0.55, 0, -0.46, 0], [0.8, 0, 0, 0], [1, 0, 0, 0]]),
    },
    spine: { rotationDeg: kf([[0, 0, 0, 0], [0.25, -58, 0, 0], [0.55, -22, 0, 0], [0.8, 6, 0, 0], [1, 0, 0, 0]]) },
    hipL: { rotationDeg: kf([[0, 0, 0, 3], [0.25, 56, 0, 3], [0.55, 104, 0, 14], [0.8, 0, 0, 3], [1, 0, 0, 3]]) },
    hipR: { rotationDeg: kf([[0, 0, 0, -3], [0.25, 56, 0, -3], [0.55, 104, 0, -14], [0.8, 0, 0, -3], [1, 0, 0, -3]]) },
    kneeL: { rotationDeg: kf([[0, 0, 0, 0], [0.25, -14, 0, 0], [0.55, -122, 0, 0], [0.8, 0, 0, 0], [1, 0, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, 0, 0, 0], [0.25, -14, 0, 0], [0.55, -122, 0, 0], [0.8, 0, 0, 0], [1, 0, 0, 0]]) },
    // Hands reach the floor at the fold, then sweep overhead to finish tall.
    shoulderL: { rotationDeg: kf([[0, 0, 0, -4], [0.25, 34, 0, -8], [0.55, 20, 0, -12], [0.8, 172, 0, -6], [1, 0, 0, -4]]) },
    shoulderR: { rotationDeg: kf([[0, 0, 0, 4], [0.25, 34, 0, 8], [0.55, 20, 0, 12], [0.8, 172, 0, 6], [1, 0, 0, 4]]) },
    elbowL: { rotationDeg: kf([[0, 4, 0, 0], [0.55, 18, 0, 0], [0.8, 6, 0, 0], [1, 4, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 4, 0, 0], [0.55, 18, 0, 0], [0.8, 6, 0, 0], [1, 4, 0, 0]]) },
  },
};

export const ROTATIONAL_SPECS: MotionSpec[] = [
  rotationalThrow, woodchopGym, woodchopHome, mobilityFlow,
];
