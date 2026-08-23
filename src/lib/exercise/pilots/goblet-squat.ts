import type { MotionSpec } from "../motion-spec";

// Sign convention (see scene.ts): rotations are DELTAS from rest pose.
// Rest pose = arms hanging, legs straight, facing -Z.
// hip X+  = knee forward (flexing hip)
// knee X- = calf back  (flexing knee)
// elbow X+ = forearm up in front
// spine X+ = torso lean forward

export const gobletSquat: MotionSpec = {
  slug: "goblet-squat",
  name: "Goblet squat",
  loop: true,
  repDurationSec: 3.2,
  restBetweenRepsSec: 0.15,
  tracks: {
    // Hold the "kettlebell" at chest throughout — constant arm pose.
    shoulderL: { rotationDeg: [{ t: 0, value: [20, 0, -25] }] },
    shoulderR: { rotationDeg: [{ t: 0, value: [20, 0, 25] }] },
    elbowL: { rotationDeg: [{ t: 0, value: [115, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [115, 0, 0] }] },

    // Descent and ascent for the pelvis, spine, and legs.
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, -0.38, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [22, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [90, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [90, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-95, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-95, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [18, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [18, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
  },
};
