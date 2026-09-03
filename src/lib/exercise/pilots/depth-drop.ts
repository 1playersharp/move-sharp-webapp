import type { MotionSpec } from "../motion-spec";

// Depth drop — step off a low box, land at the floor, stick.
// Start position: humanoid on top of the box (pelvis +0.35).
// End position: quarter-squat on the floor (pelvis ≈ -0.15).
export const depthDrop: MotionSpec = {
  slug: "depth-drop",
  name: "Depth Drop",
  loop: true,
  repDurationSec: 1.6,
  restBetweenRepsSec: 1.0,
  props: [{ kind: "box", height: 0.35, width: 0.55, depth: 0.5, z: 0.15 }],
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0.35, 0.15], ease: "smooth" }, // standing on box
        { t: 0.15, value: [0, 0.32, 0.05], ease: "smooth" }, // step off edge
        { t: 0.35, value: [0, 0.05, -0.35], ease: "smooth" }, // falling
        { t: 0.5, value: [0, -0.22, -0.45], ease: "smooth" }, // absorb
        { t: 0.7, value: [0, -0.15, -0.45], ease: "smooth" }, // stick
        { t: 1, value: [0, -0.15, -0.45], ease: "smooth" }, // hold
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [-3, 0, 0], ease: "smooth" },
        { t: 0.35, value: [-8, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-22, 0, 0], ease: "smooth" },
        { t: 1, value: [-18, 0, 0], ease: "smooth" },
      ],
    },
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [30, 0, 0], ease: "smooth" }, // leading leg forward
        { t: 0.35, value: [20, 0, 0], ease: "smooth" },
        { t: 0.5, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [50, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-5, 0, 0], ease: "smooth" },
        { t: 0.35, value: [20, 0, 0], ease: "smooth" },
        { t: 0.5, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [50, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [-5, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.35, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [-70, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [-5, 0, 0], ease: "smooth" },
        { t: 0.15, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.35, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [-70, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [18, 0, 0], ease: "smooth" },
        { t: 1, value: [15, 0, 0] },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.5, value: [18, 0, 0], ease: "smooth" },
        { t: 1, value: [15, 0, 0] },
      ],
    },
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [-5, 0, -8], ease: "smooth" },
        { t: 0.35, value: [-30, 0, -18], ease: "smooth" }, // arms out for balance
        { t: 0.5, value: [-25, 0, -22], ease: "smooth" },
        { t: 1, value: [-15, 0, -20], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [-5, 0, 8], ease: "smooth" },
        { t: 0.35, value: [-30, 0, 18], ease: "smooth" },
        { t: 0.5, value: [-25, 0, 22], ease: "smooth" },
        { t: 1, value: [-15, 0, 20], ease: "smooth" },
      ],
    },
    elbowL: { rotationDeg: [{ t: 0, value: [25, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [25, 0, 0] }] },
  },
};
