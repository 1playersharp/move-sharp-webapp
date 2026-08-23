import type { MotionSpec } from "../motion-spec";
import { gobletSquat } from "./goblet-squat";
import { aSkip } from "./a-skip";
import { broadJump } from "./broad-jump";
import { fiveTenFive } from "./five-ten-five";
import { pogoHops } from "./pogo-hops";
import { wallDrives } from "./wall-drives";
import { boxJump } from "./box-jump";
import { snapDownLanding } from "./snap-down-landing";
import { farmerCarry } from "./farmer-carry";
import { tempoRun } from "./tempo-run";
import { depthDrop } from "./depth-drop";

// Phase 5 pilots kept for the sign-off sandbox — the original 4.
export const PILOTS: MotionSpec[] = [gobletSquat, aSkip, broadJump, fiveTenFive];

// Full library-slug → MotionSpec map used by the exercise-mode detail
// pages. Library exercises without an entry render a placeholder card.
export const MOTION_SPEC_BY_SLUG: Record<string, MotionSpec> = {
  "goblet-squat": gobletSquat,
  "a-skip": aSkip,
  "broad-jump-stick": broadJump,
  "shuttle-5-10-5": fiveTenFive,
  "pogo-hops": pogoHops,
  "wall-drives": wallDrives,
  "box-jump": boxJump,
  "snap-down-landing": snapDownLanding,
  "farmer-carry": farmerCarry,
  "tempo-run": tempoRun,
  "depth-drop": depthDrop,
};

export {
  gobletSquat,
  aSkip,
  broadJump,
  fiveTenFive,
  pogoHops,
  wallDrives,
  boxJump,
  snapDownLanding,
  farmerCarry,
  tempoRun,
  depthDrop,
};
