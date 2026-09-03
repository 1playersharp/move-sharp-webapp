import type { MotionSpec } from "../motion-spec";

// Pro agility — stylized. Start at centre, sprint +X 2.3m, plant + cut,
// sprint -X back through centre to -2.3m, plant + cut, sprint +X back to
// centre. Body leans into each direction of travel; a running-arm pose
// pumps opposite to lead leg.
export const fiveTenFive: MotionSpec = {
  slug: "five-ten-five",
  name: "5-10-5 cut",
  loop: true,
  repDurationSec: 4.0,
  restBetweenRepsSec: 0.8,
  props: [
    { kind: "cone", x: 1.9, z: 0 },
    { kind: "cone", x: -1.9, z: 0 },
    { kind: "cone", x: 0, z: 0 },
  ],
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.2, value: [1.5, 0, 0], ease: "smooth" }, // +X sprint
        { t: 0.28, value: [1.9, -0.2, 0], ease: "smooth" }, // plant + drop
        { t: 0.32, value: [1.9, 0, 0], ease: "smooth" }, // rise
        { t: 0.55, value: [0, 0, 0], ease: "smooth" }, // through centre
        { t: 0.75, value: [-1.9, 0, 0], ease: "smooth" }, // -X plant
        { t: 0.78, value: [-1.9, -0.2, 0], ease: "smooth" },
        { t: 0.82, value: [-1.9, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" }, // back to centre
      ],
    },
    // Body faces the direction of travel — rotate pelvis Y to swing between +X and -X headings.
    // 0° faces -Z (rest). +90° faces -X, -90° faces +X.
    // Rest of body Ys along.
    spine: {
      rotationDeg: [
        { t: 0, value: [-10, -90, 0], ease: "smooth" }, // face +X, torso lean
        { t: 0.2, value: [-15, -90, 0], ease: "smooth" },
        { t: 0.28, value: [-25, -75, -15], ease: "smooth" }, // plant, lean into cut
        { t: 0.35, value: [-12, 90, 0], ease: "smooth" }, // face -X, accelerating
        { t: 0.65, value: [-15, 90, 0], ease: "smooth" },
        { t: 0.75, value: [-25, 75, 15], ease: "smooth" }, // plant
        { t: 0.85, value: [-12, -90, 0], ease: "smooth" }, // face +X back to centre
        { t: 1, value: [-10, -90, 0], ease: "smooth" },
      ],
    },

    // Legs alternate a simple sprint cycle. Simplified: hips oscillate in-phase
    // with steps, knees flex on recovery. Frequency roughly matches root travel.
    hipL: {
      rotationDeg: [
        { t: 0, value: [50, 0, 0], ease: "smooth" },
        { t: 0.1, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.2, value: [50, 0, 0], ease: "smooth" },
        { t: 0.28, value: [30, 0, 0], ease: "smooth" }, // plant
        { t: 0.4, value: [50, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.6, value: [50, 0, 0], ease: "smooth" },
        { t: 0.75, value: [30, 0, 0], ease: "smooth" },
        { t: 0.85, value: [50, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    hipR: {
      rotationDeg: [
        { t: 0, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.1, value: [50, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.28, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.5, value: [50, 0, 0], ease: "smooth" },
        { t: 0.6, value: [-30, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-10, 0, 0], ease: "smooth" },
        { t: 0.85, value: [-30, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.1, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.28, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.6, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-45, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.1, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.28, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-70, 0, 0], ease: "smooth" },
        { t: 0.6, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.75, value: [-45, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },

    // Arms — sprint pose with pumping.
    elbowL: { rotationDeg: [{ t: 0, value: [95, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [95, 0, 0] }] },
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [40, 0, 0], ease: "smooth" },
        { t: 0.1, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.2, value: [40, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.5, value: [40, 0, 0], ease: "smooth" },
        { t: 0.6, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.8, value: [40, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.1, value: [40, 0, 0], ease: "smooth" },
        { t: 0.2, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.4, value: [40, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-45, 0, 0], ease: "smooth" },
        { t: 0.6, value: [40, 0, 0], ease: "smooth" },
        { t: 0.8, value: [-45, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
  },
};
