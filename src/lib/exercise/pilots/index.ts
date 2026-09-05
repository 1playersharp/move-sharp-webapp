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
import { sidePlank, deadbug, pallofPressGym, pallofPressHome } from "./core";
import {
  pushUp, dbRow, bandRow, dbRdl, dbPress, bandPress, splitSquatGym, splitSquatHome,
} from "./strength";
import { rotationalThrow, woodchopGym, woodchopHome, mobilityFlow } from "./rotational";
import {
  sprint10m, flying20m, fallingStarts, lDrill, tDrill, angleCuts,
  mirrorDrill, ballRollReaction,
} from "./field-drills";
import { verticalJumpTest, standingTripleJumpTest } from "./jump-tests";
import {
  hip9090, halfKneelingHipFlexor, gluteBridge, bandedClam, kneeToWallAnkle,
  calfRaise, openBookRotation, catCow, wallAngel, footDoming, chinTuckNeck, birdDog,
} from "./mobility";

// Phase 5 pilots kept for the sign-off sandbox — the original 4.
export const PILOTS: MotionSpec[] = [gobletSquat, aSkip, broadJump, fiveTenFive];

// Cone-and-path field drills and the jump tests are authored in
// ./field-drills.ts and ./jump-tests.ts and mapped below. They were parked
// while path-drill.ts leaned the runner backwards (positive spine X tips the
// torso back); that sign is fixed, and the drills now also bank into their
// cuts.

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
  "push-up": pushUp,
  deadbug: deadbug,
  "side-plank": sidePlank,
  "rotational-med-ball-throw": rotationalThrow,
  "mobility-flow": mobilityFlow,

  // Cone-and-path field drills.
  "sprint-10m-test": sprint10m,
  "flying-20m": flying20m,
  "falling-starts": fallingStarts,
  "l-drill": lDrill,
  "t-drill": tDrill,
  "angle-cuts": angleCuts,
  "mirror-drill": mirrorDrill,
  "ball-roll-reaction": ballRollReaction,

  // Jump tests.
  "vertical-jump-test": verticalJumpTest,
  "standing-triple-jump-test": standingTripleJumpTest,

  // Movement-prep mobility drills.
  "hip-90-90": hip9090,
  "half-kneeling-hip-flexor": halfKneelingHipFlexor,
  "glute-bridge": gluteBridge,
  "banded-clam": bandedClam,
  "knee-to-wall-ankle": kneeToWallAnkle,
  "calf-raise": calfRaise,
  "open-book-rotation": openBookRotation,
  "cat-cow": catCow,
  "wall-angel": wallAngel,
  "foot-doming": footDoming,
  "chin-tuck-neck": chinTuckNeck,
  "bird-dog": birdDog,

  // Gym/home pairs — same movement, different kit, range and tempo.
  "db-row": dbRow,
  "band-row": bandRow,
  "db-rdl": dbRdl,
  "db-press": dbPress,
  "band-press": bandPress,
  "split-squat-gym": splitSquatGym,
  "split-squat-home": splitSquatHome,
  "pallof-press-gym": pallofPressGym,
  "pallof-press-home": pallofPressHome,
  "woodchop-gym": woodchopGym,
  "woodchop-home": woodchopHome,

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
  sidePlank,
  deadbug,
  pallofPressGym,
  pallofPressHome,
  pushUp,
  dbRow,
  bandRow,
  dbRdl,
  dbPress,
  bandPress,
  splitSquatGym,
  splitSquatHome,
  rotationalThrow,
  woodchopGym,
  woodchopHome,
  mobilityFlow,
  sprint10m,
  flying20m,
  fallingStarts,
  lDrill,
  tDrill,
  angleCuts,
  mirrorDrill,
  ballRollReaction,
  verticalJumpTest,
  standingTripleJumpTest,
  hip9090,
  halfKneelingHipFlexor,
  gluteBridge,
  bandedClam,
  kneeToWallAnkle,
  calfRaise,
  openBookRotation,
  catCow,
  wallAngel,
  footDoming,
  chinTuckNeck,
  birdDog,
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
