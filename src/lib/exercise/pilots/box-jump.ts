import type { MotionSpec } from "../motion-spec";

// Two-foot vertical jump onto a box. Small forward travel + significant
// vertical, landing at a raised height that holds through the rest window.
export const boxJump: MotionSpec = {
  slug: "box-jump",
  name: "Box Jump",
  loop: true,
  repDurationSec: 1.8,
  restBetweenRepsSec: 1.4,
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [0, -0.32, 0], ease: "smooth" }, // gather
        { t: 0.4, value: [0, 0.35, -0.15], ease: "smooth" }, // apex
        { t: 0.55, value: [0, 0.25, -0.3], ease: "smooth" }, // land on box
        { t: 0.75, value: [0, 0.05, -0.3], ease: "smooth" }, // absorb
        { t: 1, value: [0, 0.15, -0.3], ease: "smooth" }, // stand on box
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [30, 0, 0], ease: "smooth" }, // hinge on gather
        { t: 0.4, value: [-5, 0, 0], ease: "smooth" }, // extend on launch
        { t: 0.55, value: [15, 0, 0], ease: "smooth" }, // pull knees up
        { t: 0.75, value: [20, 0, 0], ease: "smooth" }, // absorb
        { t: 1, value: [5, 0, 0], ease: "smooth" }, // stand tall on box
      ],
    },
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [65, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [70, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [10, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [65, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [70, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [10, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-95, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [-10, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-95, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [-10, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.2, value: [22, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-25, 0, 0], ease: "smooth" },
        { t: 0.55, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.2, value: [22, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-25, 0, 0], ease: "smooth" },
        { t: 0.55, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },

    // Arm swing — back on gather, forward + up on launch.
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-65, 0, -10], ease: "smooth" },
        { t: 0.4, value: [140, 0, -5], ease: "smooth" },
        { t: 0.55, value: [60, 0, -10], ease: "smooth" },
        { t: 0.75, value: [0, 0, -15], ease: "smooth" },
        { t: 1, value: [-15, 0, -18], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-65, 0, 10], ease: "smooth" },
        { t: 0.4, value: [140, 0, 5], ease: "smooth" },
        { t: 0.55, value: [60, 0, 10], ease: "smooth" },
        { t: 0.75, value: [0, 0, 15], ease: "smooth" },
        { t: 1, value: [-15, 0, 18], ease: "smooth" },
      ],
    },
    elbowL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [40, 0, 0], ease: "smooth" },
        { t: 0.4, value: [15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [45, 0, 0], ease: "smooth" },
      ],
    },
    elbowR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [40, 0, 0], ease: "smooth" },
        { t: 0.4, value: [15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [45, 0, 0], ease: "smooth" },
      ],
    },
  },
};
