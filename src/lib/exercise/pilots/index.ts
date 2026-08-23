import type { MotionSpec } from "../motion-spec";
import { gobletSquat } from "./goblet-squat";
import { aSkip } from "./a-skip";
import { broadJump } from "./broad-jump";
import { fiveTenFive } from "./five-ten-five";

export const PILOTS: MotionSpec[] = [gobletSquat, aSkip, broadJump, fiveTenFive];

export { gobletSquat, aSkip, broadJump, fiveTenFive };
