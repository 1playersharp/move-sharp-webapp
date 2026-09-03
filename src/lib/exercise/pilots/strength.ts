import type { MotionSpec, Keyframe, SceneProp, Vec3 } from "../motion-spec";

// Push, pull, hinge and split-stance work. The six gym/home pairs share a base
// movement and differ in kit, range and tempo — a band hinge has a shorter
// pull than a DB RDL, and a band press has resistance at the top rather than
// the bottom.
//
// Convention: forward is -Z. Positive X swings a hip or shoulder forward;
// NEGATIVE spine X leans the torso forward (the torso extends +Y).

const kf = (frames: Array<[number, number, number, number]>): Keyframe<Vec3>[] =>
  frames.map(([t, x, y, z]) => ({ t, value: [x, y, z] as Vec3, ease: "smooth" }));

const DUMBBELLS: SceneProp[] = [
  { kind: "held_weight", side: "L" },
  { kind: "held_weight", side: "R" },
];

// ---- Push-up ---------------------------------------------------------------
export const pushUp: MotionSpec = {
  slug: "push-up",
  name: "Push-Up",
  loop: true,
  repDurationSec: 2.4,
  tracks: {
    // Face down, supported on hands and toes. The body rises and falls as one
    // plank — the elbows do the work.
    pelvis: {
      rotationDeg: kf([[0, -90, 0, 0], [1, -90, 0, 0]]),
      position: kf([[0, 0, -0.24, 0], [0.45, 0, -0.42, 0], [0.55, 0, -0.42, 0], [1, 0, -0.24, 0]]),
    },
    // Hips stay in line with the shoulders — no sag.
    spine: { rotationDeg: kf([[0, 2, 0, 0], [1, 2, 0, 0]]) },
    // Arms under the shoulders; elbows bend to lower the chest.
    shoulderL: { rotationDeg: kf([[0, 92, 0, -12], [0.5, 74, 0, -26], [1, 92, 0, -12]]) },
    shoulderR: { rotationDeg: kf([[0, 92, 0, 12], [0.5, 74, 0, 26], [1, 92, 0, 12]]) },
    elbowL: { rotationDeg: kf([[0, 4, 0, 0], [0.5, 82, 0, 0], [1, 4, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 4, 0, 0], [0.5, 82, 0, 0], [1, 4, 0, 0]]) },
    hipL: { rotationDeg: kf([[0, -6, 0, 2], [1, -6, 0, 2]]) },
    hipR: { rotationDeg: kf([[0, -6, 0, -2], [1, -6, 0, -2]]) },
  },
};

// ---- Row -------------------------------------------------------------------
// Hinged over, pulling to the ribs. The gym version holds dumbbells; the home
// version pulls a band anchored low in front.
function row(slug: string, name: string, props: SceneProp[], fold: number): MotionSpec {
  // The shoulders hang off the spine, so a folded torso carries the arms with
  // it. Countering the fold by the same angle is what makes the arms hang
  // straight down under gravity instead of sticking out behind.
  const hang = fold;
  return {
    slug,
    name,
    loop: true,
    repDurationSec: 2.6,
    props,
    tracks: {
      // Hinged forward, flat back, held there throughout.
      spine: { rotationDeg: kf([[0, -fold, 0, 0], [1, -fold, 0, 0]]) },
      hipL: { rotationDeg: kf([[0, fold - 2, 0, 2], [1, fold - 2, 0, 2]]) },
      hipR: { rotationDeg: kf([[0, fold - 2, 0, -2], [1, fold - 2, 0, -2]]) },
      kneeL: { rotationDeg: kf([[0, -22, 0, 0], [1, -22, 0, 0]]) },
      kneeR: { rotationDeg: kf([[0, -22, 0, 0], [1, -22, 0, 0]]) },
      // Arms hang straight down, then the elbows drive back until the upper
      // arm lines up with the torso.
      shoulderL: { rotationDeg: kf([[0, hang, 0, -4], [0.45, 4, 0, -8], [0.6, 4, 0, -8], [1, hang, 0, -4]]) },
      shoulderR: { rotationDeg: kf([[0, hang, 0, 4], [0.45, 4, 0, 8], [0.6, 4, 0, 8], [1, hang, 0, 4]]) },
      elbowL: { rotationDeg: kf([[0, 6, 0, 0], [0.45, 96, 0, 0], [0.6, 96, 0, 0], [1, 6, 0, 0]]) },
      elbowR: { rotationDeg: kf([[0, 6, 0, 0], [0.45, 96, 0, 0], [0.6, 96, 0, 0], [1, 6, 0, 0]]) },
    },
  };
}

export const dbRow = row("db-row", "DB Row", DUMBBELLS, 46);
// A band from the floor in front pulls at a flatter angle, so the torso stays
// a little higher.
export const bandRow = row("band-row", "Band Row", [{ kind: "band", anchor: [0, 0.1, -1.3], grip: "both" }], 38);

// ---- Hinge -----------------------------------------------------------------
// RDL pattern: push the hips back, keep the back flat, stand up tall.
function hinge(slug: string, name: string, props: SceneProp[], depth: number): MotionSpec {
  return {
    slug,
    name,
    loop: true,
    repDurationSec: 3.0,
    props,
    tracks: {
      // Hips travel backward as the torso folds — the shin stays near vertical.
      pelvis: { position: kf([[0, 0, 0, 0], [0.5, 0, -0.07, 0.16], [1, 0, 0, 0]]) },
      spine: { rotationDeg: kf([[0, 0, 0, 0], [0.5, -depth, 0, 0], [1, 0, 0, 0]]) },
      hipL: { rotationDeg: kf([[0, 0, 0, 2], [0.5, depth, 0, 2], [1, 0, 0, 2]]) },
      hipR: { rotationDeg: kf([[0, 0, 0, -2], [0.5, depth, 0, -2], [1, 0, 0, -2]]) },
      kneeL: { rotationDeg: kf([[0, -4, 0, 0], [0.5, -16, 0, 0], [1, -4, 0, 0]]) },
      kneeR: { rotationDeg: kf([[0, -4, 0, 0], [0.5, -16, 0, 0], [1, -4, 0, 0]]) },
      // Arms hang vertically the whole way down — countering the fold by the
      // full angle, or they swing out in front of the thigh.
      shoulderL: { rotationDeg: kf([[0, 0, 0, -3], [0.5, depth, 0, -3], [1, 0, 0, -3]]) },
      shoulderR: { rotationDeg: kf([[0, 0, 0, 3], [0.5, depth, 0, 3], [1, 0, 0, 3]]) },
      elbowL: { rotationDeg: kf([[0, 3, 0, 0], [1, 3, 0, 0]]) },
      elbowR: { rotationDeg: kf([[0, 3, 0, 0], [1, 3, 0, 0]]) },
    },
  };
}

export const dbRdl = hinge("db-rdl", "DB RDL", DUMBBELLS, 62);
// A band under the feet runs out of range sooner, so the hinge is shallower.

// ---- Overhead press --------------------------------------------------------
function press(slug: string, name: string, props: SceneProp[]): MotionSpec {
  return {
    slug,
    name,
    loop: true,
    repDurationSec: 2.6,
    props,
    tracks: {
      // Tall and braced — ribs down, no arching back under the load.
      spine: { rotationDeg: kf([[0, 0, 0, 0], [0.5, 3, 0, 0], [1, 0, 0, 0]]) },
      // From the shoulders to locked out overhead.
      shoulderL: { rotationDeg: kf([[0, 86, 0, -30], [0.5, 168, 0, -8], [0.62, 168, 0, -8], [1, 86, 0, -30]]) },
      shoulderR: { rotationDeg: kf([[0, 86, 0, 30], [0.5, 168, 0, 8], [0.62, 168, 0, 8], [1, 86, 0, 30]]) },
      elbowL: { rotationDeg: kf([[0, 112, 0, 0], [0.5, 6, 0, 0], [0.62, 6, 0, 0], [1, 112, 0, 0]]) },
      elbowR: { rotationDeg: kf([[0, 112, 0, 0], [0.5, 6, 0, 0], [0.62, 6, 0, 0], [1, 112, 0, 0]]) },
      hipL: { rotationDeg: kf([[0, 0, 0, 2], [1, 0, 0, 2]]) },
      hipR: { rotationDeg: kf([[0, 0, 0, -2], [1, 0, 0, -2]]) },
      kneeL: { rotationDeg: kf([[0, -4, 0, 0], [1, -4, 0, 0]]) },
      kneeR: { rotationDeg: kf([[0, -4, 0, 0], [1, -4, 0, 0]]) },
    },
  };
}

export const dbPress = press("db-press", "DB Press", DUMBBELLS);
export const bandPress = press("band-press", "Band Press", [{ kind: "band", anchor: [0, 0.05, 0.1], grip: "both" }]);

// ---- Split squat -----------------------------------------------------------
// Staggered stance, back knee drops toward the floor, front shin stays over
// the ankle.
function splitSquat(slug: string, name: string, props: SceneProp[]): MotionSpec {
  return {
    slug,
    name,
    loop: true,
    repDurationSec: 3.0,
    props,
    tracks: {
      pelvis: { position: kf([[0, 0, 0, 0], [0.5, 0, -0.3, 0], [1, 0, 0, 0]]) },
      // Torso stays tall — a shade of forward lean, no more.
      spine: { rotationDeg: kf([[0, -4, 0, 0], [0.5, -10, 0, 0], [1, -4, 0, 0]]) },
      // Front leg (left) forward, back leg (right) trailing.
      hipL: { rotationDeg: kf([[0, 24, 0, 3], [0.5, 62, 0, 3], [1, 24, 0, 3]]) },
      kneeL: { rotationDeg: kf([[0, -26, 0, 0], [0.5, -78, 0, 0], [1, -26, 0, 0]]) },
      hipR: { rotationDeg: kf([[0, -22, 0, -3], [0.5, -34, 0, -3], [1, -22, 0, -3]]) },
      kneeR: { rotationDeg: kf([[0, -30, 0, 0], [0.5, -96, 0, 0], [1, -30, 0, 0]]) },
      // Arms hang with the load, or stay balanced if bodyweight.
      shoulderL: { rotationDeg: kf([[0, 0, 0, -4], [1, 0, 0, -4]]) },
      shoulderR: { rotationDeg: kf([[0, 0, 0, 4], [1, 0, 0, 4]]) },
      elbowL: { rotationDeg: kf([[0, 4, 0, 0], [1, 4, 0, 0]]) },
      elbowR: { rotationDeg: kf([[0, 4, 0, 0], [1, 4, 0, 0]]) },
    },
  };
}

export const splitSquatGym = splitSquat("split-squat-gym", "DB Split Squat", DUMBBELLS);
export const splitSquatHome = splitSquat("split-squat-home", "Split Squat", []);

export const STRENGTH_SPECS: MotionSpec[] = [
  pushUp, dbRow, bandRow, dbRdl, dbPress, bandPress, splitSquatGym, splitSquatHome,
];
