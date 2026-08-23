import type { MotionSpec } from "../motion-spec";

// Two-foot jump onto a box, land, absorb, stand tall on box. Box lives at
// z=-0.35 in front of the humanoid; feet land on top at y=0.35.
export const boxJump: MotionSpec = {
  slug: "box-jump",
  name: "Box Jump",
  loop: true,
  repDurationSec: 1.8,
  restBetweenRepsSec: 1.4,
  props: [{ kind: "box", height: 0.35, width: 0.55, depth: 0.5, z: -0.35 }],
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [0, -0.32, 0], ease: "smooth" }, // gather
        { t: 0.4, value: [0, 0.55, -0.2], ease: "smooth" }, // apex over the box
        { t: 0.55, value: [0, 0.35, -0.35], ease: "smooth" }, // feet touch top of box
        { t: 0.75, value: [0, 0.2, -0.35], ease: "smooth" }, // absorb on box
        { t: 1, value: [0, 0.35, -0.35], ease: "smooth" }, // stand tall on box
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [30, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-5, 0, 0], ease: "smooth" },
        { t: 0.55, value: [15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [20, 0, 0], ease: "smooth" },
        { t: 1, value: [3, 0, 0], ease: "smooth" },
      ],
    },
    hipL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [65, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [70, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [5, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [65, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [70, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [5, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-95, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [-5, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-95, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.55, value: [-90, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-80, 0, 0], ease: "smooth" },
        { t: 1, value: [-5, 0, 0], ease: "smooth" },
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
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-65, 0, -10], ease: "smooth" },
        { t: 0.4, value: [140, 0, -5], ease: "smooth" },
        { t: 0.55, value: [60, 0, -10], ease: "smooth" },
        { t: 0.75, value: [0, 0, -15], ease: "smooth" },
        { t: 1, value: [-10, 0, -12], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-65, 0, 10], ease: "smooth" },
        { t: 0.4, value: [140, 0, 5], ease: "smooth" },
        { t: 0.55, value: [60, 0, 10], ease: "smooth" },
        { t: 0.75, value: [0, 0, 15], ease: "smooth" },
        { t: 1, value: [-10, 0, 12], ease: "smooth" },
      ],
    },
    elbowL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [40, 0, 0], ease: "smooth" },
        { t: 0.4, value: [15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [30, 0, 0], ease: "smooth" },
      ],
    },
    elbowR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [40, 0, 0], ease: "smooth" },
        { t: 0.4, value: [15, 0, 0], ease: "smooth" },
        { t: 0.75, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [30, 0, 0], ease: "smooth" },
      ],
    },
  },
};
