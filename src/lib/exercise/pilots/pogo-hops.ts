import type { MotionSpec } from "../motion-spec";

// Stiff-ankle vertical bounces. Fast tempo, minimal knee bend, small pop.
export const pogoHops: MotionSpec = {
  slug: "pogo-hops",
  name: "Pogo Hops",
  loop: true,
  repDurationSec: 0.35,
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [0, -0.05, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0.15, 0], ease: "smooth" },
        { t: 0.7, value: [0, -0.05, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [15, 0, 0], ease: "smooth" }, // dorsiflex on load
        { t: 0.5, value: [-30, 0, 0], ease: "smooth" }, // plantarflex on pop
        { t: 0.7, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.7, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [-15, 0, 0], ease: "smooth" }, // slight bend on land
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    // Arms hang slightly bent for balance.
    elbowL: { rotationDeg: [{ t: 0, value: [30, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [30, 0, 0] }] },
  },
};
