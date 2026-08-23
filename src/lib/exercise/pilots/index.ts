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
// Split exercises (e.g. box-jump gym + step-jump home) share the same
// underlying spec — the visible box just represents whichever the player
// actually has to hand.
export const MOTION_SPEC_BY_SLUG: Record<string, MotionSpec> = {
  "a-skip": aSkip,
  "broad-jump-stick": broadJump,
  "shuttle-5-10-5": fiveTenFive,
  "pogo-hops": pogoHops,
  "wall-drives": wallDrives,
  "snap-down-landing": snapDownLanding,
  "tempo-run": tempoRun,

  // Split slug pairs that share a spec.
  "goblet-squat-gym": gobletSquat,
  "goblet-squat-home": gobletSquat,
  "box-jump-gym": boxJump,
  "step-jump-home": boxJump,
  "depth-drop-gym": depthDrop,
  "depth-drop-home": depthDrop,
  "farmer-carry-gym": farmerCarry,
  "farmer-carry-home": farmerCarry,
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
