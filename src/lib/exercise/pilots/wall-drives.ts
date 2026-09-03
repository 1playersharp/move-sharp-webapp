import type { MotionSpec } from "../motion-spec";

// Wall drive marches — hands on wall, body angled forward at ~60°,
// alternating knee drives to horizontal. One rep = one L-R march cycle.
export const wallDrives: MotionSpec = {
  slug: "wall-drives",
  name: "Wall Drives",
  loop: true,
  repDurationSec: 1.6,
  props: [{ kind: "wall", z: -0.45, width: 2, height: 2.2 }],
  tracks: {
    // Body angled forward — pelvis rotated forward and pushed slightly.
    pelvis: {
      position: [{ t: 0, value: [0, -0.05, 0] }],
    },
    // Torso leans forward the whole time.
    spine: {
      rotationDeg: [{ t: 0, value: [-25, 0, 0] }],
    },
    // Arms out in front — pressing into "wall".
    shoulderL: {
      rotationDeg: [{ t: 0, value: [130, 0, -8] }],
    },
    shoulderR: {
      rotationDeg: [{ t: 0, value: [130, 0, 8] }],
    },
    elbowL: {
      rotationDeg: [{ t: 0, value: [20, 0, 0] }],
    },
    elbowR: {
      rotationDeg: [{ t: 0, value: [20, 0, 0] }],
    },

    // Left knee drives up in first half, right in second half.
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.25, value: [80, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.25, value: [25, 0, 0], ease: "smooth" }, // toe up
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [80, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-90, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [25, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
  },
};
