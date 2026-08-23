import type { MotionSpec } from "../motion-spec";

// One-shot with a hold at the end — "stick the landing".
// The rest window between reps holds the last frame, so a looped preview
// still reads as jump → stick → reset.
export const broadJump: MotionSpec = {
  slug: "broad-jump",
  name: "Broad jump + stick",
  loop: true,
  repDurationSec: 2.4,
  restBetweenRepsSec: 1.6,
  props: [{ kind: "floor_marker", z: -0.85, width: 0.55, depth: 0.45 }],
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [0, -0.28, 0.05], ease: "smooth" }, // gather
        { t: 0.32, value: [0, 0.18, -0.4], ease: "smooth" }, // apex
        { t: 0.5, value: [0, 0.05, -0.85], ease: "smooth" }, // land
        { t: 0.7, value: [0, -0.25, -0.85], ease: "smooth" }, // absorb
        { t: 1, value: [0, -0.18, -0.85], ease: "smooth" }, // stick
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [25, 0, 0], ease: "smooth" }, // hinge forward on gather
        { t: 0.3, value: [-8, 0, 0], ease: "smooth" }, // extend on launch
        { t: 0.5, value: [15, 0, 0], ease: "smooth" }, // pull knees up
        { t: 0.7, value: [22, 0, 0], ease: "smooth" }, // absorb
        { t: 1, value: [12, 0, 0], ease: "smooth" }, // stick
      ],
    },
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [55, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [60, 0, 0], ease: "smooth" },
        { t: 0.7, value: [60, 0, 0], ease: "smooth" },
        { t: 1, value: [45, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [55, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [60, 0, 0], ease: "smooth" },
        { t: 0.7, value: [60, 0, 0], ease: "smooth" },
        { t: 1, value: [45, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-95, 0, 0], ease: "smooth" },
        { t: 1, value: [-65, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-95, 0, 0], ease: "smooth" },
        { t: 1, value: [-65, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.15, value: [20, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-30, 0, 0], ease: "smooth" }, // plantarflex on launch
        { t: 0.5, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [10, 0, 0] },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.15, value: [20, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.5, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [10, 0, 0] },
      ],
    },

    // Arms: back on gather, whip forward + up on launch, down on stick.
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-70, 0, -15], ease: "smooth" }, // arms behind
        { t: 0.3, value: [140, 0, -10], ease: "smooth" }, // arms overhead-ish
        { t: 0.5, value: [40, 0, -20], ease: "smooth" }, // pulling down
        { t: 0.7, value: [-30, 0, -25], ease: "smooth" }, // arms out for balance
        { t: 1, value: [-15, 0, -25], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-70, 0, 15], ease: "smooth" },
        { t: 0.3, value: [140, 0, 10], ease: "smooth" },
        { t: 0.5, value: [40, 0, 20], ease: "smooth" },
        { t: 0.7, value: [-30, 0, 25], ease: "smooth" },
        { t: 1, value: [-15, 0, 25], ease: "smooth" },
      ],
    },
    elbowL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [40, 0, 0], ease: "smooth" },
        { t: 0.3, value: [10, 0, 0], ease: "smooth" },
        { t: 0.7, value: [70, 0, 0], ease: "smooth" },
        { t: 1, value: [50, 0, 0], ease: "smooth" },
      ],
    },
    elbowR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [40, 0, 0], ease: "smooth" },
        { t: 0.3, value: [10, 0, 0], ease: "smooth" },
        { t: 0.7, value: [70, 0, 0], ease: "smooth" },
        { t: 1, value: [50, 0, 0], ease: "smooth" },
      ],
    },
  },
};
