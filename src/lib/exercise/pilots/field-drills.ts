import { pathDrill } from "./path-drill";
import type { MotionSpec } from "../motion-spec";

// Field drills built from cone layouts + paths. Distances are stylized so the
// shape of the drill reads at the camera distances the viewer frames to — see
// path-drill.ts.

const CONE = 0xe08a1c;

// ---- Straight-line speed ---------------------------------------------------

export const sprint10m: MotionSpec = pathDrill({
  slug: "sprint-10m-test",
  name: "10m Sprint Test",
  repDurationSec: 2.6,
  restBetweenRepsSec: 0.8,
  cadence: 3.6,
  lean: 20,
  props: [
    { kind: "cone", x: -0.5, z: 1.6, color: CONE },
    { kind: "cone", x: 0.5, z: 1.6, color: CONE },
    { kind: "cone", x: -0.5, z: -1.8, color: CONE },
    { kind: "cone", x: 0.5, z: -1.8, color: CONE },
  ],
  waypoints: [
    // Still on the line, then away — the first three steps are the test.
    { t: 0, x: 0, z: 1.6, hold: true },
    { t: 0.18, x: 0, z: 1.6 },
    { t: 1, x: 0, z: -1.8 },
  ],
});

export const flying20m: MotionSpec = pathDrill({
  slug: "flying-20m",
  name: "Flying 20m",
  repDurationSec: 2.4,
  // A run-through ends downfield, so it cannot loop seamlessly. Hold the
  // last frame for a beat before resetting, as the 10m sprint does.
  restBetweenRepsSec: 0.8,
  cadence: 3.8,
  lean: 12,
  props: [
    { kind: "cone", x: -0.5, z: 0.4, color: CONE },
    { kind: "cone", x: 0.5, z: 0.4, color: CONE },
    { kind: "cone", x: -0.5, z: -2.0, color: CONE },
    { kind: "cone", x: 0.5, z: -2.0, color: CONE },
  ],
  // Already at full speed through the gate — no standing start.
  waypoints: [
    { t: 0, x: 0, z: 2.2 },
    { t: 1, x: 0, z: -2.2 },
  ],
});

export const fallingStarts: MotionSpec = pathDrill({
  slug: "falling-starts",
  name: "Falling Starts",
  repDurationSec: 2.8,
  restBetweenRepsSec: 0.6,
  cadence: 3.4,
  lean: 24,
  props: [{ kind: "floor_marker", z: 1.7, width: 1.2, depth: 0.3 }],
  waypoints: [
    // Stand tall, tip forward, then catch it with the first stride.
    { t: 0, x: 0, z: 1.7, hold: true },
    { t: 0.3, x: 0, z: 1.7 },
    { t: 1, x: 0, z: -1.9 },
  ],
});

// ---- Change of direction ---------------------------------------------------

export const lDrill: MotionSpec = pathDrill({
  slug: "l-drill",
  name: "L-Drill (3-cone)",
  repDurationSec: 5.2,
  restBetweenRepsSec: 0.6,
  cadence: 3.0,
  props: [
    { kind: "cone", x: 0, z: 1.6, color: CONE },
    { kind: "cone", x: 0, z: -0.4, color: CONE },
    { kind: "cone", x: 1.8, z: -0.4, color: CONE },
  ],
  waypoints: [
    { t: 0, x: 0, z: 1.6, hold: true },
    { t: 0.1, x: 0, z: 1.6 },
    { t: 0.24, x: 0, z: -0.3, plant: true },
    { t: 0.38, x: 0, z: 1.5, plant: true },
    { t: 0.52, x: 0, z: -0.4 },
    { t: 0.68, x: 1.7, z: -0.4, plant: true },
    { t: 0.82, x: 1.7, z: 0.5, plant: true },
    { t: 1, x: 0, z: 1.6 },
  ],
});

export const tDrill: MotionSpec = pathDrill({
  slug: "t-drill",
  name: "T-Drill",
  repDurationSec: 5.6,
  restBetweenRepsSec: 0.6,
  cadence: 3.0,
  props: [
    { kind: "cone", x: 0, z: 1.8, color: CONE },
    { kind: "cone", x: 0, z: -0.8, color: CONE },
    { kind: "cone", x: -1.7, z: -0.8, color: CONE },
    { kind: "cone", x: 1.7, z: -0.8, color: CONE },
  ],
  waypoints: [
    { t: 0, x: 0, z: 1.8, hold: true },
    { t: 0.08, x: 0, z: 1.8 },
    { t: 0.26, x: 0, z: -0.8, plant: true },
    { t: 0.44, x: -1.7, z: -0.8, plant: true },
    { t: 0.66, x: 1.7, z: -0.8, plant: true },
    { t: 0.82, x: 0, z: -0.8, plant: true },
    { t: 1, x: 0, z: 1.8 },
  ],
});

export const angleCuts: MotionSpec = pathDrill({
  slug: "angle-cuts",
  name: "Angle Cuts",
  repDurationSec: 4.2,
  restBetweenRepsSec: 0.5,
  cadence: 3.2,
  props: [
    { kind: "cone", x: 0, z: 1.8, color: CONE },
    { kind: "cone", x: -1.4, z: 0.2, color: CONE },
    { kind: "cone", x: 1.4, z: -1.0, color: CONE },
  ],
  // Zig-zag: plant on the outside foot and drive off at an angle.
  waypoints: [
    { t: 0, x: 0, z: 1.8, hold: true },
    { t: 0.1, x: 0, z: 1.8 },
    { t: 0.35, x: -1.4, z: 0.2, plant: true },
    { t: 0.65, x: 1.4, z: -1.0, plant: true },
    { t: 1, x: 0, z: 1.8 },
  ],
});

export const mirrorDrill: MotionSpec = pathDrill({
  slug: "mirror-drill",
  name: "Mirror Drill",
  repDurationSec: 4.0,
  cadence: 2.8,
  lean: 8,
  props: [
    { kind: "floor_marker", z: 0, width: 0.3, depth: 3.2 },
    { kind: "cone", x: -1.5, z: 0, color: CONE },
    { kind: "cone", x: 1.5, z: 0, color: CONE },
  ],
  // Shuffling side to side, mirroring a partner across the line.
  waypoints: [
    { t: 0, x: 0, z: 0.6 },
    { t: 0.2, x: -1.2, z: 0.6, plant: true },
    { t: 0.45, x: 0.9, z: 0.6, plant: true },
    { t: 0.65, x: -0.6, z: 0.6, plant: true },
    { t: 0.85, x: 1.2, z: 0.6, plant: true },
    { t: 1, x: 0, z: 0.6 },
  ],
});

export const ballRollReaction: MotionSpec = pathDrill({
  slug: "ball-roll-reaction",
  name: "Ball Roll Reaction",
  repDurationSec: 3.2,
  restBetweenRepsSec: 0.7,
  cadence: 3.5,
  lean: 22,
  props: [
    { kind: "floor_marker", z: 1.6, width: 1.4, depth: 0.3 },
    { kind: "cone", x: 1.6, z: -1.4, color: CONE },
  ],
  // Wait on the mark, react, chase the ball down at an angle.
  waypoints: [
    { t: 0, x: 0, z: 1.6, hold: true },
    { t: 0.25, x: 0, z: 1.6 },
    { t: 1, x: 1.6, z: -1.4 },
  ],
});

export const FIELD_DRILLS: MotionSpec[] = [
  sprint10m,
  flying20m,
  fallingStarts,
  lDrill,
  tDrill,
  angleCuts,
  mirrorDrill,
  ballRollReaction,
];
