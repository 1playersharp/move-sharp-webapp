import type { MotionSpec } from "../motion-spec";

// Snap-down: from tall stance, drop into a quarter-squat landing shape and
// hold briefly. Teaches the landing without the jump.
export const snapDownLanding: MotionSpec = {
  slug: "snap-down-landing",
  name: "Snap-Down Landing",
  loop: true,
  repDurationSec: 1.2,
  restBetweenRepsSec: 0.6,
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [0, -0.28, 0], ease: "smooth" }, // snap down
        { t: 0.7, value: [0, -0.28, 0], ease: "smooth" }, // hold
        { t: 1, value: [0, 0, 0], ease: "smooth" }, // return
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-22, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-22, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [70, 0, 0], ease: "smooth" },
        { t: 0.7, value: [70, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [70, 0, 0], ease: "smooth" },
        { t: 0.7, value: [70, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-80, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-80, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [18, 0, 0], ease: "smooth" },
        { t: 0.7, value: [18, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [18, 0, 0], ease: "smooth" },
        { t: 0.7, value: [18, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    // Arms swing back on snap-down (like catching a punch).
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-40, 0, -8], ease: "smooth" },
        { t: 0.7, value: [-40, 0, -8], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [-40, 0, 8], ease: "smooth" },
        { t: 0.7, value: [-40, 0, 8], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    elbowL: { rotationDeg: [{ t: 0, value: [30, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [30, 0, 0] }] },
  },
};
