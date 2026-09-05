import type { Keyframe, MotionSpec, SceneProp, Vec3 } from "../motion-spec";

// Field drills — shuttles, cone patterns, sprints, reactive cuts — are all the
// same thing: the player travels a path between markers while running. Only
// the path and the cone layout differ. Hand-authoring each one as a full
// MotionSpec (the 5-10-5 pilot runs to 140 lines) means re-authoring a running
// gait every time, so this builds the spec from the path instead.
//
// Distances are stylized, not literal: a real 5-10-5 covers 9m, which framed
// honestly would leave the player a few pixels tall. Roughly 2-3m of travel
// reads correctly at the camera distances the viewer uses.

export type Waypoint = {
  /** Fraction of one rep, 0-1. */
  t: number;
  x: number;
  z: number;
  /** Plant and change direction here — adds a dip and a braking lean. */
  plant?: boolean;
  /** Stand still through to the next waypoint (a start position, a hold). */
  hold?: boolean;
};

export type PathDrillOptions = {
  slug: string;
  name: string;
  repDurationSec: number;
  restBetweenRepsSec?: number;
  waypoints: Waypoint[];
  props?: SceneProp[];
  /** Steps per second. Sprinting is quicker than a shuttle's stutter steps. */
  cadence?: number;
  /**
   * Degrees of forward torso lean while running, as a positive number.
   *
   * Emitted as negative spine X, because positive X tips the torso backwards
   * (the rig extends +Y and faces -Z). The hand-authored 5-10-5 leans with
   * -10 to -25 for the same reason.
   *
   * The lean does not need decomposing by heading: the rig applies joint
   * rotations in YXZ order (see humanoid.ts), so the Y heading is outermost
   * and X tips the body in its own frame — a runner leans into the direction
   * of travel through a corner, not toward world -Z.
   */
  lean?: number;
  /** Samples per rep — more gives smoother facing through tight cuts. */
  samples?: number;
};

const TAU = Math.PI * 2;
const RAD = 180 / Math.PI;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function lerp(a: number, b: number, k: number): number {
  return a + (b - a) * k;
}

// Position along the path at rep-fraction t, plus the heading it implies.
function sample(waypoints: Waypoint[], t: number) {
  let a = waypoints[0];
  let b = waypoints[waypoints.length - 1];
  for (let i = 0; i < waypoints.length - 1; i++) {
    if (t >= waypoints[i].t && t <= waypoints[i + 1].t) {
      a = waypoints[i];
      b = waypoints[i + 1];
      break;
    }
  }
  const span = b.t - a.t;
  const local = span === 0 ? 0 : (t - a.t) / span;
  // Ease into and out of every leg so plants read as decelerations rather
  // than instant direction reversals.
  const k = a.hold ? 0 : local * local * (3 - 2 * local);
  return {
    x: lerp(a.x, b.x, k),
    z: lerp(a.z, b.z, k),
    holding: Boolean(a.hold),
    // Distance from the nearest plant, used to duck the gait during a cut.
    nearPlant: (a.plant && local < 0.25) || (b.plant && local > 0.75),
    legX: b.x - a.x,
    legZ: b.z - a.z,
  };
}

// The rig rests facing -Z, and a Y rotation of `a` points it at
// (-sin a, 0, -cos a) — so this is the heading that aims it down the leg of
// the path it's currently running. Matches the hand-authored 5-10-5.
function headingDeg(dx: number, dz: number, previous: number): number {
  if (dx === 0 && dz === 0) return previous;
  const length = Math.hypot(dx, dz);
  let deg = Math.atan2(-dx / length, -dz / length) * RAD;
  // Take the shortest way round so a cut doesn't spin the body 350°.
  while (deg - previous > 180) deg -= 360;
  while (previous - deg > 180) deg += 360;
  return deg;
}

// Turning is not instantaneous. Raw per-segment headings are constant within a
// leg and jump at each waypoint, so a 180° shuttle reversal would snap around
// in a single frame. Smoothing spreads each turn over several samples, which
// reads as a pivot.
function smoothHeadings(headings: number[], passes = 4): number[] {
  let out = headings.slice();
  for (let pass = 0; pass < passes; pass++) {
    const next = out.slice();
    for (let i = 1; i < out.length - 1; i++) {
      next[i] = out[i - 1] * 0.25 + out[i] * 0.5 + out[i + 1] * 0.25;
    }
    out = next;
  }
  return out;
}

export function pathDrill({
  slug,
  name,
  repDurationSec,
  restBetweenRepsSec,
  waypoints,
  props,
  cadence = 3.2,
  lean = 14,
  samples = 48,
}: PathDrillOptions): MotionSpec {
  const pelvis: Keyframe<Vec3>[] = [];
  const spine: Keyframe<Vec3>[] = [];
  const hipL: Keyframe<Vec3>[] = [];
  const hipR: Keyframe<Vec3>[] = [];
  const kneeL: Keyframe<Vec3>[] = [];
  const kneeR: Keyframe<Vec3>[] = [];
  const shoulderL: Keyframe<Vec3>[] = [];
  const shoulderR: Keyframe<Vec3>[] = [];
  const elbowL: Keyframe<Vec3>[] = [];
  const elbowR: Keyframe<Vec3>[] = [];

  // --- Pass 1: path positions and raw headings ------------------------------
  const path: Array<ReturnType<typeof sample>> = [];
  const rawHeadings: number[] = [];
  let heading = 0;
  for (let i = 0; i <= samples; i++) {
    const at = sample(waypoints, i / samples);
    heading = headingDeg(at.legX, at.legZ, heading);
    path.push(at);
    rawHeadings.push(heading);
  }

  // A drill that finishes where it started must also finish facing where it
  // started, or the body spins on every loop. Ease the last stretch back to
  // the opening heading (rounded to the nearest full turn, so a drill that
  // genuinely rotates 360° still reads as one full turn).
  const first = path[0];
  const last = path[path.length - 1];
  const returnsToStart = Math.hypot(last.x - first.x, last.z - first.z) < 0.2;
  if (returnsToStart) {
    const target =
      rawHeadings[0] + Math.round((rawHeadings[rawHeadings.length - 1] - rawHeadings[0]) / 360) * 360;
    const tail = Math.max(2, Math.round(samples * 0.18));
    for (let i = samples - tail; i <= samples; i++) {
      const k = (i - (samples - tail)) / tail;
      rawHeadings[i] = lerp(rawHeadings[i], target, k * k * (3 - 2 * k));
    }
  }

  const headings = smoothHeadings(rawHeadings);

  // The gait has to close: a looping drill whose last frame is mid-stride
  // snaps back to the first on every rep. Round the requested cadence to the
  // nearest whole number of steps over the rep so phase(1) == phase(0).
  const gaitCycles = Math.max(1, Math.round(repDurationSec * cadence));

  // --- Pass 2: emit keyframes ----------------------------------------------
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const at = path[i];

    // Gait phase. Held positions stand still; a plant shortens the stride.
    const phase = (t * gaitCycles) % 1;
    const swing = at.holding ? 0 : Math.sin(phase * TAU);
    const damp = at.holding ? 0 : at.nearPlant ? 0.45 : 1;

    // Vertical bob, plus a dip through each plant.
    const bob = at.holding ? 0 : Math.abs(Math.sin(phase * Math.PI)) * 0.035;
    const dip = at.nearPlant ? -0.12 : 0;

    // Bank into the turn. Sign is opposite the heading change, matching the
    // hand-authored 5-10-5 (heading rising -> negative Z at the plant).
    const prev = headings[Math.max(0, i - 1)];
    const next = headings[Math.min(samples, i + 1)];
    const bank = at.holding ? 0 : clamp(-(next - prev) * 0.6, -18, 18);

    pelvis.push({ t, value: [at.x, bob + dip, at.z], ease: "smooth" });
    spine.push({
      t,
      // Negative X leans forward; a plant adds a braking lean on top.
      value: [
        at.holding ? -4 : -(lean + (at.nearPlant ? 10 : 0)),
        headings[i],
        bank,
      ],
      ease: "smooth",
    });

    // Legs drive opposite each other; knees flex hardest on recovery.
    const driveL = swing * 48 * damp;
    const driveR = -swing * 48 * damp;
    hipL.push({ t, value: [driveL + (at.holding ? 0 : 8), 0, 0], ease: "smooth" });
    hipR.push({ t, value: [driveR + (at.holding ? 0 : 8), 0, 0], ease: "smooth" });
    kneeL.push({ t, value: [-Math.max(0, -driveL) * 1.5 - 12 * damp, 0, 0], ease: "smooth" });
    kneeR.push({ t, value: [-Math.max(0, -driveR) * 1.5 - 12 * damp, 0, 0], ease: "smooth" });

    // Arms counter-swing to the legs.
    shoulderL.push({ t, value: [driveR * 0.7, 0, 0], ease: "smooth" });
    shoulderR.push({ t, value: [driveL * 0.7, 0, 0], ease: "smooth" });
    elbowL.push({ t, value: [-75 * damp, 0, 0], ease: "smooth" });
    elbowR.push({ t, value: [-75 * damp, 0, 0], ease: "smooth" });
  }

  return {
    slug,
    name,
    loop: true,
    repDurationSec,
    restBetweenRepsSec,
    props,
    tracks: {
      pelvis: { position: pelvis },
      spine: { rotationDeg: spine },
      hipL: { rotationDeg: hipL },
      hipR: { rotationDeg: hipR },
      kneeL: { rotationDeg: kneeL },
      kneeR: { rotationDeg: kneeR },
      shoulderL: { rotationDeg: shoulderL },
      shoulderR: { rotationDeg: shoulderR },
      elbowL: { rotationDeg: elbowL },
      elbowR: { rotationDeg: elbowR },
    },
  };
}
