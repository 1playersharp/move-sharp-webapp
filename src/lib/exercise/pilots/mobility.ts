import type { MotionSpec, Keyframe, Vec3 } from "../motion-spec";

// Movement-prep mobility drills — the region-specific work Movement Prep 6
// is built from.
//
// Convention (see humanoid.ts): rest pose is standing, facing -Z, pelvis at
// y=0.92. Positive X on a hip or shoulder swings the limb forward; positive X
// on the spine or neck tips BACKWARD, so lean forward with negative spine X.
// Ankle +X is dorsiflexion (shin over toes, as in the squat), so -X is the
// plantarflexion of a calf raise.
//
// These are slower and smaller than the rest of the library. Mobility work is
// held positions and controlled range, so most specs run 3-5s per rep with a
// plateau in the middle rather than a fast concentric.
//
// Floor positions are reached by rotating the pelvis and dropping it to the
// right height: X+90 lies supine, Z-90 lies on the side, and a quadruped is
// an upright pelvis at knee height with the spine tipped to horizontal.

const kf = (frames: Array<[number, number, number, number]>): Keyframe<Vec3>[] =>
  frames.map(([t, x, y, z]) => ({ t, value: [x, y, z] as Vec3, ease: "smooth" }));

// Pelvis heights for the seated and floor positions, as offsets from the
// standing rest height.
const FLOOR_SEATED = -0.62;
const FLOOR_SUPINE = -0.78;
const FLOOR_SIDE = -0.72;
const QUADRUPED = -0.44;
const HALF_KNEELING = -0.34;

// ---- 90/90 hip rotations ---------------------------------------------------
// Seated with both knees at 90°, sweeping the legs from one side to the other.
// The sweep is hip Y — the pelvis stays put and the femurs rotate in the socket,
// which is the whole point of the drill.
export const hip9090: MotionSpec = {
  slug: "hip-90-90",
  name: "90/90 Hip Rotations",
  loop: true,
  repDurationSec: 4.4,
  tracks: {
    pelvis: { position: kf([[0, 0, FLOOR_SEATED, 0], [1, 0, FLOOR_SEATED, 0]]) },
    // Chest stays tall; a touch of counter-lean as the legs sweep across.
    spine: { rotationDeg: kf([[0, -6, 8, 0], [0.5, -6, -8, 0], [1, -6, 8, 0]]) },
    hipL: { rotationDeg: kf([[0, 80, -46, 0], [0.5, 80, 46, 0], [1, 80, -46, 0]]) },
    hipR: { rotationDeg: kf([[0, 80, -46, 0], [0.5, 80, 46, 0], [1, 80, -46, 0]]) },
    kneeL: { rotationDeg: kf([[0, -88, 0, 0], [1, -88, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -88, 0, 0], [1, -88, 0, 0]]) },
    // Hands propped on the floor behind, following the sweep.
    shoulderL: { rotationDeg: kf([[0, -28, 0, -16], [1, -28, 0, -16]]) },
    shoulderR: { rotationDeg: kf([[0, -28, 0, 16], [1, -28, 0, 16]]) },
    elbowL: { rotationDeg: kf([[0, 16, 0, 0], [1, 16, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 16, 0, 0], [1, 16, 0, 0]]) },
  },
};

// ---- Half-kneeling hip flexor stretch --------------------------------------
// The movement is small and the cue is a posterior tilt first, then an easing
// forward. Back hip extends; the torso stays stacked rather than arching.
export const halfKneelingHipFlexor: MotionSpec = {
  slug: "half-kneeling-hip-flexor",
  name: "Half-Kneeling Hip Flexor Stretch",
  loop: true,
  repDurationSec: 5.0,
  tracks: {
    pelvis: {
      position: kf([[0, 0, HALF_KNEELING, 0], [0.4, 0, HALF_KNEELING, -0.07], [0.75, 0, HALF_KNEELING, -0.07], [1, 0, HALF_KNEELING, 0]]),
      // Tuck the tailbone under before easing forward.
      rotationDeg: kf([[0, 0, 0, 0], [0.25, -10, 0, 0], [0.75, -10, 0, 0], [1, 0, 0, 0]]),
    },
    spine: { rotationDeg: kf([[0, 4, 0, 0], [0.4, 8, 0, 0], [0.75, 8, 0, 0], [1, 4, 0, 0]]) },
    // Front leg planted at 90/90.
    hipL: { rotationDeg: kf([[0, 88, 0, 3], [1, 88, 0, 3]]) },
    kneeL: { rotationDeg: kf([[0, -92, 0, 0], [1, -92, 0, 0]]) },
    // Back leg kneeling — the hip that opens.
    hipR: { rotationDeg: kf([[0, -6, 0, -3], [0.4, -26, 0, -3], [0.75, -26, 0, -3], [1, -6, 0, -3]]) },
    kneeR: { rotationDeg: kf([[0, -108, 0, 0], [1, -108, 0, 0]]) },
    shoulderL: { rotationDeg: kf([[0, 24, 0, -10], [1, 24, 0, -10]]) },
    shoulderR: { rotationDeg: kf([[0, 4, 0, 10], [1, 4, 0, 10]]) },
    elbowL: { rotationDeg: kf([[0, 18, 0, 0], [1, 18, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 6, 0, 0], [1, 6, 0, 0]]) },
  },
};

// ---- Glute bridge ----------------------------------------------------------
// Supine, feet planted, hips drive up and hold. The hold at the top is the
// prescription ("2s hold at top"), so the plateau is deliberate.
export const gluteBridge: MotionSpec = {
  slug: "glute-bridge",
  name: "Glute Bridge",
  loop: true,
  repDurationSec: 3.6,
  tracks: {
    pelvis: {
      rotationDeg: kf([[0, 90, 0, 0], [1, 90, 0, 0]]),
      position: kf([[0, 0, FLOOR_SUPINE, 0], [0.35, 0, -0.56, 0], [0.7, 0, -0.56, 0], [1, 0, FLOOR_SUPINE, 0]]),
    },
    // Ribs stay down — no arching to fake height.
    spine: { rotationDeg: kf([[0, 0, 0, 0], [0.35, -6, 0, 0], [0.7, -6, 0, 0], [1, 0, 0, 0]]) },
    hipL: { rotationDeg: kf([[0, 56, 0, 3], [0.35, 24, 0, 3], [0.7, 24, 0, 3], [1, 56, 0, 3]]) },
    hipR: { rotationDeg: kf([[0, 56, 0, -3], [0.35, 24, 0, -3], [0.7, 24, 0, -3], [1, 56, 0, -3]]) },
    kneeL: { rotationDeg: kf([[0, -96, 0, 0], [0.35, -84, 0, 0], [0.7, -84, 0, 0], [1, -96, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -96, 0, 0], [0.35, -84, 0, 0], [0.7, -84, 0, 0], [1, -96, 0, 0]]) },
    // Arms flat on the floor at the sides.
    shoulderL: { rotationDeg: kf([[0, -8, 0, -14], [1, -8, 0, -14]]) },
    shoulderR: { rotationDeg: kf([[0, -8, 0, 14], [1, -8, 0, 14]]) },
  },
};

// ---- Banded clam -----------------------------------------------------------
// Side-lying, heels together, top knee opens against the band.
//
// No band prop: the SceneProp band runs from an anchor to the hands, and this
// band sits around the knees. Drawing it to the hands would show the wrong
// exercise, so the drill runs unprop'd rather than wrongly propped.
export const bandedClam: MotionSpec = {
  slug: "banded-clam",
  name: "Banded Clam",
  loop: true,
  repDurationSec: 2.6,
  tracks: {
    pelvis: {
      rotationDeg: kf([[0, 0, 0, -90], [1, 0, 0, -90]]),
      position: kf([[0, 0, FLOOR_SIDE, 0], [1, 0, FLOOR_SIDE, 0]]),
    },
    // Hips stay stacked — no rolling backwards to steal range.
    spine: { rotationDeg: kf([[0, -6, 0, 0], [1, -6, 0, 0]]) },
    // Top leg opens; bottom leg is the anchor.
    hipL: { rotationDeg: kf([[0, 44, 0, 0], [0.45, 44, 0, 38], [0.6, 44, 0, 38], [1, 44, 0, 0]]) },
    kneeL: { rotationDeg: kf([[0, -94, 0, 0], [1, -94, 0, 0]]) },
    hipR: { rotationDeg: kf([[0, 46, 0, 0], [1, 46, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -96, 0, 0], [1, -96, 0, 0]]) },
    // Bottom arm under the head, top hand on the hip.
    shoulderL: { rotationDeg: kf([[0, 18, 0, -10], [1, 18, 0, -10]]) },
    shoulderR: { rotationDeg: kf([[0, 86, 0, 0], [1, 86, 0, 0]]) },
    elbowL: { rotationDeg: kf([[0, 28, 0, 0], [1, 28, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 96, 0, 0], [1, 96, 0, 0]]) },
  },
};

// ---- Knee-to-wall ankle mobilisation ---------------------------------------
// Front knee tracks forward over the toes towards a wall, heel glued down.
// The wall is what makes this readable as a measurement, so it earns a prop.
export const kneeToWallAnkle: MotionSpec = {
  slug: "knee-to-wall-ankle",
  name: "Knee-to-Wall Ankle Mobilisation",
  loop: true,
  repDurationSec: 3.0,
  props: [{ kind: "wall", z: -0.62, width: 1.8, height: 2.2 }],
  tracks: {
    pelvis: { position: kf([[0, 0, -0.06, 0], [0.45, 0, -0.12, -0.09], [0.6, 0, -0.12, -0.09], [1, 0, -0.06, 0]]) },
    spine: { rotationDeg: kf([[0, -8, 0, 0], [0.45, -12, 0, 0], [1, -8, 0, 0]]) },
    // Front leg drives the knee forward; the ankle is what's being opened.
    hipL: { rotationDeg: kf([[0, 26, 0, 3], [0.45, 44, 0, 3], [0.6, 44, 0, 3], [1, 26, 0, 3]]) },
    kneeL: { rotationDeg: kf([[0, -32, 0, 0], [0.45, -56, 0, 0], [0.6, -56, 0, 0], [1, -32, 0, 0]]) },
    ankleL: { rotationDeg: kf([[0, 20, 0, 0], [0.45, 44, 0, 0], [0.6, 44, 0, 0], [1, 20, 0, 0]]) },
    // Back leg trails, taking no load.
    hipR: { rotationDeg: kf([[0, -14, 0, -3], [1, -14, 0, -3]]) },
    kneeR: { rotationDeg: kf([[0, -10, 0, 0], [1, -10, 0, 0]]) },
    // Hands on the wall for balance.
    shoulderL: { rotationDeg: kf([[0, 88, 0, -12], [1, 88, 0, -12]]) },
    shoulderR: { rotationDeg: kf([[0, 88, 0, 12], [1, 88, 0, 12]]) },
    elbowL: { rotationDeg: kf([[0, 24, 0, 0], [0.45, 40, 0, 0], [1, 24, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 24, 0, 0], [0.45, 40, 0, 0], [1, 24, 0, 0]]) },
  },
};

// ---- Calf raise ------------------------------------------------------------
// Up fast, down slow — the three-second lower is where the work is, so the
// descent takes most of the rep.
export const calfRaise: MotionSpec = {
  slug: "calf-raise",
  name: "Calf Raise",
  loop: true,
  repDurationSec: 4.2,
  tracks: {
    pelvis: { position: kf([[0, 0, 0, 0], [0.22, 0, 0.11, 0], [0.34, 0, 0.11, 0], [1, 0, 0, 0]]) },
    // Plantarflexion is negative ankle X.
    ankleL: { rotationDeg: kf([[0, 0, 0, 0], [0.22, -36, 0, 0], [0.34, -36, 0, 0], [1, 0, 0, 0]]) },
    ankleR: { rotationDeg: kf([[0, 0, 0, 0], [0.22, -36, 0, 0], [0.34, -36, 0, 0], [1, 0, 0, 0]]) },
    // Legs stay long throughout — no knee bend to bounce out of the bottom.
    kneeL: { rotationDeg: kf([[0, -4, 0, 0], [1, -4, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -4, 0, 0], [1, -4, 0, 0]]) },
    spine: { rotationDeg: kf([[0, 0, 0, 0], [1, 0, 0, 0]]) },
    shoulderL: { rotationDeg: kf([[0, 0, 0, -8], [1, 0, 0, -8]]) },
    shoulderR: { rotationDeg: kf([[0, 0, 0, 8], [1, 0, 0, 8]]) },
  },
};

// ---- Open book T-spine rotation --------------------------------------------
// Side-lying with knees stacked; the top arm sweeps open across the body.
// The rotation lives on the spine — knees staying down is the coaching point.
export const openBookRotation: MotionSpec = {
  slug: "open-book-rotation",
  name: "Open Book T-Spine Rotation",
  loop: true,
  repDurationSec: 4.6,
  tracks: {
    pelvis: {
      rotationDeg: kf([[0, 0, 0, -90], [1, 0, 0, -90]]),
      position: kf([[0, 0, FLOOR_SIDE, 0], [1, 0, FLOOR_SIDE, 0]]),
    },
    spine: { rotationDeg: kf([[0, 0, 0, 0], [0.45, 0, -76, 0], [0.62, 0, -76, 0], [1, 0, 0, 0]]) },
    neck: { rotationDeg: kf([[0, 0, 0, 0], [0.45, 0, -26, 0], [0.62, 0, -26, 0], [1, 0, 0, 0]]) },
    // Knees stay stacked and down while the chest opens above them.
    hipL: { rotationDeg: kf([[0, 62, 0, 0], [1, 62, 0, 0]]) },
    kneeL: { rotationDeg: kf([[0, -96, 0, 0], [1, -96, 0, 0]]) },
    hipR: { rotationDeg: kf([[0, 64, 0, 0], [1, 64, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -98, 0, 0], [1, -98, 0, 0]]) },
    // Both arms start out front; the top one opens away.
    shoulderL: { rotationDeg: kf([[0, 88, 0, 0], [0.45, 96, 0, -18], [0.62, 96, 0, -18], [1, 88, 0, 0]]) },
    shoulderR: { rotationDeg: kf([[0, 88, 0, 0], [1, 88, 0, 0]]) },
    elbowL: { rotationDeg: kf([[0, 8, 0, 0], [1, 8, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 8, 0, 0], [1, 8, 0, 0]]) },
  },
};

// ---- Cat / cow -------------------------------------------------------------
// Four-point, alternating flexion and extension through the spine.
//
// The rig has one spine joint, so the round and the arch are a tip either side
// of horizontal rather than a true segmental curl. The neck carries most of
// the read: chin tucks under for cat, lifts for cow.
export const catCow: MotionSpec = {
  slug: "cat-cow",
  name: "Cat/Cow",
  loop: true,
  repDurationSec: 5.0,
  tracks: {
    pelvis: { position: kf([[0, 0, QUADRUPED, 0], [1, 0, QUADRUPED, 0]]) },
    spine: { rotationDeg: kf([[0, -88, 0, 0], [0.3, -104, 0, 0], [0.7, -74, 0, 0], [1, -88, 0, 0]]) },
    neck: { rotationDeg: kf([[0, 0, 0, 0], [0.3, -30, 0, 0], [0.7, 24, 0, 0], [1, 0, 0, 0]]) },
    // Thighs vertical, shins back along the floor.
    hipL: { rotationDeg: kf([[0, 2, 0, 3], [1, 2, 0, 3]]) },
    hipR: { rotationDeg: kf([[0, 2, 0, -3], [1, 2, 0, -3]]) },
    kneeL: { rotationDeg: kf([[0, -92, 0, 0], [1, -92, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -92, 0, 0], [1, -92, 0, 0]]) },
    // Arms post straight down to the floor from the horizontal torso.
    shoulderL: { rotationDeg: kf([[0, 90, 0, -8], [1, 90, 0, -8]]) },
    shoulderR: { rotationDeg: kf([[0, 90, 0, 8], [1, 90, 0, 8]]) },
    elbowL: { rotationDeg: kf([[0, 4, 0, 0], [1, 4, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 4, 0, 0], [1, 4, 0, 0]]) },
  },
};

// ---- Wall angel ------------------------------------------------------------
// Back flat to a wall, arms sliding from a W to overhead.
//
// The rig faces -Z at rest and the wall prop sits in front of it, so the
// pelvis is spun 180° to put the wall behind the athlete's back.
export const wallAngel: MotionSpec = {
  slug: "wall-angel",
  name: "Wall Angel",
  loop: true,
  repDurationSec: 4.4,
  props: [{ kind: "wall", z: -0.34, width: 1.8, height: 2.4 }],
  tracks: {
    pelvis: { rotationDeg: kf([[0, 0, 180, 0], [1, 0, 180, 0]]) },
    // Flat against the wall — no arching to buy range.
    spine: { rotationDeg: kf([[0, 2, 0, 0], [1, 2, 0, 0]]) },
    // W position, sliding to a Y overhead and back.
    shoulderL: { rotationDeg: kf([[0, 92, 0, -30], [0.45, 158, 0, -16], [0.6, 158, 0, -16], [1, 92, 0, -30]]) },
    shoulderR: { rotationDeg: kf([[0, 92, 0, 30], [0.45, 158, 0, 16], [0.6, 158, 0, 16], [1, 92, 0, 30]]) },
    elbowL: { rotationDeg: kf([[0, 92, 0, 0], [0.45, 16, 0, 0], [0.6, 16, 0, 0], [1, 92, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 92, 0, 0], [0.45, 16, 0, 0], [0.6, 16, 0, 0], [1, 92, 0, 0]]) },
    kneeL: { rotationDeg: kf([[0, -10, 0, 0], [1, -10, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -10, 0, 0], [1, -10, 0, 0]]) },
  },
};

// ---- Foot doming -----------------------------------------------------------
// Short-foot drill: the arch shortens while the toes stay long and flat.
//
// Honest limitation — the rig has no toe joint and the whole movement is a
// centimetre of arch travel. This reads as a standing hold with a subtle
// inward roll at the ankle, which is a schematic of the drill rather than a
// faithful animation of it. The coaching cue carries the detail.
export const footDoming: MotionSpec = {
  slug: "foot-doming",
  name: "Foot Doming",
  loop: true,
  repDurationSec: 3.4,
  tracks: {
    pelvis: { position: kf([[0, 0, 0, 0], [0.4, 0, 0.016, 0], [0.7, 0, 0.016, 0], [1, 0, 0, 0]]) },
    ankleL: { rotationDeg: kf([[0, 0, 0, 0], [0.4, -5, 0, -9], [0.7, -5, 0, -9], [1, 0, 0, 0]]) },
    ankleR: { rotationDeg: kf([[0, 0, 0, 0], [0.4, -5, 0, 9], [0.7, -5, 0, 9], [1, 0, 0, 0]]) },
    kneeL: { rotationDeg: kf([[0, -6, 0, 0], [1, -6, 0, 0]]) },
    kneeR: { rotationDeg: kf([[0, -6, 0, 0], [1, -6, 0, 0]]) },
    spine: { rotationDeg: kf([[0, 0, 0, 0], [1, 0, 0, 0]]) },
    shoulderL: { rotationDeg: kf([[0, 0, 0, -8], [1, 0, 0, -8]]) },
    shoulderR: { rotationDeg: kf([[0, 0, 0, 8], [1, 0, 0, 8]]) },
  },
};

// ---- Chin tuck + neck holds ------------------------------------------------
// Deep neck flexor work: a gentle retraction held, not a nod. One neck joint
// means the retraction reads as a small flexion.
export const chinTuckNeck: MotionSpec = {
  slug: "chin-tuck-neck",
  name: "Chin Tuck + Neck Holds",
  loop: true,
  repDurationSec: 4.0,
  tracks: {
    // Tall and still from the shoulders down — only the neck works.
    pelvis: { position: kf([[0, 0, 0, 0], [1, 0, 0, 0]]) },
    spine: { rotationDeg: kf([[0, 2, 0, 0], [1, 2, 0, 0]]) },
    neck: { rotationDeg: kf([[0, 0, 0, 0], [0.25, -17, 0, 0], [0.75, -17, 0, 0], [1, 0, 0, 0]]) },
    shoulderL: { rotationDeg: kf([[0, 0, 0, -8], [1, 0, 0, -8]]) },
    shoulderR: { rotationDeg: kf([[0, 0, 0, 8], [1, 0, 0, 8]]) },
  },
};

// ---- Bird dog --------------------------------------------------------------
// Four-point, opposite arm and leg extending while the trunk stays level.
// Alternates sides across one rep, returning through neutral between them.
export const birdDog: MotionSpec = {
  slug: "bird-dog",
  name: "Bird Dog",
  loop: true,
  repDurationSec: 5.4,
  tracks: {
    pelvis: { position: kf([[0, 0, QUADRUPED, 0], [1, 0, QUADRUPED, 0]]) },
    // Hips stay level — the trunk is the thing being trained, not the limbs.
    spine: { rotationDeg: kf([[0, -88, 0, 0], [1, -88, 0, 0]]) },
    neck: { rotationDeg: kf([[0, -4, 0, 0], [1, -4, 0, 0]]) },
    // Left arm with right leg, then right arm with left leg.
    shoulderL: { rotationDeg: kf([[0, 90, 0, -8], [0.2, 172, 0, -6], [0.35, 172, 0, -6], [0.5, 90, 0, -8], [1, 90, 0, -8]]) },
    shoulderR: { rotationDeg: kf([[0, 90, 0, 8], [0.5, 90, 0, 8], [0.7, 172, 0, 6], [0.85, 172, 0, 6], [1, 90, 0, 8]]) },
    elbowL: { rotationDeg: kf([[0, 4, 0, 0], [1, 4, 0, 0]]) },
    elbowR: { rotationDeg: kf([[0, 4, 0, 0], [1, 4, 0, 0]]) },
    hipR: { rotationDeg: kf([[0, 2, 0, -3], [0.2, -58, 0, -3], [0.35, -58, 0, -3], [0.5, 2, 0, -3], [1, 2, 0, -3]]) },
    kneeR: { rotationDeg: kf([[0, -92, 0, 0], [0.2, -8, 0, 0], [0.35, -8, 0, 0], [0.5, -92, 0, 0], [1, -92, 0, 0]]) },
    hipL: { rotationDeg: kf([[0, 2, 0, 3], [0.5, 2, 0, 3], [0.7, -58, 0, 3], [0.85, -58, 0, 3], [1, 2, 0, 3]]) },
    kneeL: { rotationDeg: kf([[0, -92, 0, 0], [0.5, -92, 0, 0], [0.7, -8, 0, 0], [0.85, -8, 0, 0], [1, -92, 0, 0]]) },
  },
};

export const MOBILITY_SPECS: MotionSpec[] = [
  hip9090,
  halfKneelingHipFlexor,
  gluteBridge,
  bandedClam,
  kneeToWallAnkle,
  calfRaise,
  openBookRotation,
  catCow,
  wallAngel,
  footDoming,
  chinTuckNeck,
  birdDog,
];
