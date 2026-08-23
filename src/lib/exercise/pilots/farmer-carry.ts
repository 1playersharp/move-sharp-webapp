import type { MotionSpec } from "../motion-spec";

// Farmer carry — walking cycle with arms hanging at sides (holding load).
// Small, controlled step pattern. One rep = one L-R step cycle.
export const farmerCarry: MotionSpec = {
  slug: "farmer-carry",
  name: "Farmer Carry",
  loop: true,
  repDurationSec: 1.4,
  tracks: {
    // Small vertical rise-fall as weight shifts.
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.25, value: [0, 0.03, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.75, value: [0, 0.03, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    // Tall spine, minimal lean.
    spine: {
      rotationDeg: [{ t: 0, value: [2, 0, 0] }],
    },
    // Arms hang mostly straight; slight forward angle from the load pulling down.
    shoulderL: {
      rotationDeg: [{ t: 0, value: [0, 0, -5] }],
    },
    shoulderR: {
      rotationDeg: [{ t: 0, value: [0, 0, 5] }],
    },
    // Elbows slightly bent under load.
    elbowL: { rotationDeg: [{ t: 0, value: [15, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [15, 0, 0] }] },

    // Legs — walking cycle. Small hip flexion, moderate knee flexion.
    hipL: {
      rotationDeg: [
        { t: 0, value: [25, 0, 0], ease: "smooth" }, // L leg forward
        { t: 0.25, value: [-15, 0, 0], ease: "smooth" }, // pushing off
        { t: 0.5, value: [25, 0, 0], ease: "smooth" },
        { t: 1, value: [25, 0, 0] },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [-15, 0, 0], ease: "smooth" }, // R leg back
        { t: 0.25, value: [25, 0, 0], ease: "smooth" }, // swinging forward
        { t: 0.5, value: [-15, 0, 0], ease: "smooth" },
        { t: 1, value: [-15, 0, 0] },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-35, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-15, 0, 0], ease: "smooth" },
        { t: 1, value: [-15, 0, 0] },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [-35, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-35, 0, 0], ease: "smooth" },
        { t: 1, value: [-35, 0, 0] },
      ],
    },
  },
};
