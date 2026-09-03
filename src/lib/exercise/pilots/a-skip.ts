import type { MotionSpec } from "../motion-spec";

// One rep = one full L-R skip cycle so alternation is baked in.
// t=0.25 → left knee up, right leg driving; t=0.75 → right knee up, left driving.
// Arms swing opposite: when left knee up, right arm forward.
export const aSkip: MotionSpec = {
  slug: "a-skip",
  name: "A-skip",
  loop: true,
  repDurationSec: 1.4,
  tracks: {
    // Small vertical hop twice per rep.
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [0, 0.1, 0], ease: "smooth" },
        { t: 0.3, value: [0, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.65, value: [0, 0.1, 0], ease: "smooth" },
        { t: 0.8, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },

    // Left knee drives up in first half of rep.
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.25, value: [95, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-100, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.25, value: [30, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },

    // Right knee drives up in second half.
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [95, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-100, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [30, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },

    // Elbows bent for a running-arm pose throughout.
    elbowL: { rotationDeg: [{ t: 0, value: [95, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [95, 0, 0] }] },

    // Opposite-arm swing — right arm forward when left knee up.
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.25, value: [65, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-45, 0, 0], ease: "smooth" },
        { t: 1, value: [-15, 0, 0], ease: "smooth" },
      ],
    },
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [65, 0, 0], ease: "smooth" },
        { t: 1, value: [-15, 0, 0], ease: "smooth" },
      ],
    },

    // Tiny torso counter-rotation so it doesn't look robotic.
    spine: {
      rotationDeg: [
        { t: 0, value: [-8, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-10, -6, 0], ease: "smooth" },
        { t: 0.5, value: [-8, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-10, 6, 0], ease: "smooth" },
        { t: 1, value: [-8, 0, 0], ease: "smooth" },
      ],
    },
  },
};
