import type { MotionSpec } from "../motion-spec";

// Tempo run — 70% pace, relaxed sprint mechanics. Longer stride, softer
// arm swing, less aggressive knee drive than a max sprint.
export const tempoRun: MotionSpec = {
  slug: "tempo-run",
  name: "Tempo Run",
  loop: true,
  repDurationSec: 0.7,
  tracks: {
    // Subtle vertical oscillation as weight cycles across feet.
    pelvis: {
      position: [
        { t: 0, value: [0, 0.03, 0], ease: "smooth" },
        { t: 0.25, value: [0, -0.02, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0.03, 0], ease: "smooth" },
        { t: 0.75, value: [0, -0.02, 0], ease: "smooth" },
        { t: 1, value: [0, 0.03, 0], ease: "smooth" },
      ],
    },
    spine: {
      rotationDeg: [{ t: 0, value: [-8, 0, 0] }],
    },

    // Left knee drives up on first half of rep, then recovers.
    hipL: {
      rotationDeg: [
        { t: 0, value: [-20, 0, 0], ease: "smooth" }, // leg back
        { t: 0.25, value: [55, 0, 0], ease: "smooth" }, // knee up
        { t: 0.5, value: [-20, 0, 0], ease: "smooth" },
        { t: 1, value: [-20, 0, 0] },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-75, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-20, 0, 0], ease: "smooth" },
        { t: 1, value: [-20, 0, 0] },
      ],
    },

    // Right knee drives up on the second half.
    hipR: {
      rotationDeg: [
        { t: 0, value: [55, 0, 0], ease: "smooth" }, // knee up
        { t: 0.25, value: [-20, 0, 0], ease: "smooth" }, // leg back
        { t: 0.5, value: [55, 0, 0], ease: "smooth" },
        { t: 1, value: [55, 0, 0] },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [-75, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-20, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-75, 0, 0], ease: "smooth" },
        { t: 1, value: [-75, 0, 0] },
      ],
    },

    // Softer arm swing than a sprint — smaller amplitude.
    elbowL: { rotationDeg: [{ t: 0, value: [80, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [80, 0, 0] }] },
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [-25, 0, 0], ease: "smooth" }, // arm back
        { t: 0.25, value: [40, 0, 0], ease: "smooth" }, // arm forward
        { t: 0.5, value: [-25, 0, 0], ease: "smooth" },
        { t: 1, value: [-25, 0, 0] },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [40, 0, 0], ease: "smooth" },
        { t: 0.25, value: [-25, 0, 0], ease: "smooth" },
        { t: 0.5, value: [40, 0, 0], ease: "smooth" },
        { t: 1, value: [40, 0, 0] },
      ],
    },
  },
};
