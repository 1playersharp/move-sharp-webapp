import type { MotionSpec, Keyframe, Vec3 } from "../motion-spec";
import { broadJump } from "./broad-jump";

// The two jump tests. The vertical jump is authored here; the standing triple
// jump reuses the broad jump's mechanics — it is three of them in sequence —
// with its own markers and a longer rep.

const sym = (frames: Keyframe<Vec3>[]) => frames;

export const verticalJumpTest: MotionSpec = {
  slug: "vertical-jump-test",
  name: "Vertical Jump Test",
  loop: true,
  repDurationSec: 2.0,
  restBetweenRepsSec: 1.0,
  // The wall you mark with your reach.
  props: [{ kind: "wall", z: -0.55, width: 1.6, height: 2.6 }],
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.22, value: [0, -0.32, 0], ease: "smooth" }, // countermovement dip
        { t: 0.42, value: [0, 0.42, 0], ease: "smooth" }, // apex
        { t: 0.6, value: [0, 0, 0], ease: "smooth" }, // land
        { t: 0.74, value: [0, -0.2, 0], ease: "smooth" }, // absorb
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    spine: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.22, value: [28, 0, 0], ease: "smooth" },
        { t: 0.4, value: [-6, 0, 0], ease: "smooth" },
        { t: 0.6, value: [10, 0, 0], ease: "smooth" },
        { t: 0.74, value: [20, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    hipL: { rotationDeg: sym([
      { t: 0, value: [0, 0, 0], ease: "smooth" },
      { t: 0.22, value: [62, 0, 0], ease: "smooth" },
      { t: 0.4, value: [-12, 0, 0], ease: "smooth" },
      { t: 0.52, value: [30, 0, 0], ease: "smooth" },
      { t: 0.74, value: [55, 0, 0], ease: "smooth" },
      { t: 1, value: [0, 0, 0], ease: "smooth" },
    ]) },
    hipR: { rotationDeg: sym([
      { t: 0, value: [0, 0, 0], ease: "smooth" },
      { t: 0.22, value: [62, 0, 0], ease: "smooth" },
      { t: 0.4, value: [-12, 0, 0], ease: "smooth" },
      { t: 0.52, value: [30, 0, 0], ease: "smooth" },
      { t: 0.74, value: [55, 0, 0], ease: "smooth" },
      { t: 1, value: [0, 0, 0], ease: "smooth" },
    ]) },
    kneeL: { rotationDeg: sym([
      { t: 0, value: [0, 0, 0], ease: "smooth" },
      { t: 0.22, value: [-95, 0, 0], ease: "smooth" },
      { t: 0.4, value: [-5, 0, 0], ease: "smooth" },
      { t: 0.52, value: [-45, 0, 0], ease: "smooth" },
      { t: 0.74, value: [-85, 0, 0], ease: "smooth" },
      { t: 1, value: [0, 0, 0], ease: "smooth" },
    ]) },
    kneeR: { rotationDeg: sym([
      { t: 0, value: [0, 0, 0], ease: "smooth" },
      { t: 0.22, value: [-95, 0, 0], ease: "smooth" },
      { t: 0.4, value: [-5, 0, 0], ease: "smooth" },
      { t: 0.52, value: [-45, 0, 0], ease: "smooth" },
      { t: 0.74, value: [-85, 0, 0], ease: "smooth" },
      { t: 1, value: [0, 0, 0], ease: "smooth" },
    ]) },
    // Arms swing down on the dip, then hard overhead to mark the wall.
    shoulderL: { rotationDeg: sym([
      { t: 0, value: [0, 0, 0], ease: "smooth" },
      { t: 0.22, value: [-40, 0, 0], ease: "smooth" },
      { t: 0.42, value: [175, 0, 0], ease: "smooth" },
      { t: 0.6, value: [90, 0, 0], ease: "smooth" },
      { t: 1, value: [0, 0, 0], ease: "smooth" },
    ]) },
    shoulderR: { rotationDeg: sym([
      { t: 0, value: [0, 0, 0], ease: "smooth" },
      { t: 0.22, value: [-40, 0, 0], ease: "smooth" },
      { t: 0.42, value: [175, 0, 0], ease: "smooth" },
      { t: 0.6, value: [90, 0, 0], ease: "smooth" },
      { t: 1, value: [0, 0, 0], ease: "smooth" },
    ]) },
  },
};

// Three bounds in sequence. Same mechanics as the broad jump, so it borrows
// the authored tracks rather than restating them, with markers for each
// landing.
export const standingTripleJumpTest: MotionSpec = {
  ...broadJump,
  slug: "standing-triple-jump-test",
  name: "Standing Triple Jump Test",
  repDurationSec: 2.0,
  restBetweenRepsSec: 0.9,
  props: [
    { kind: "floor_marker", z: -0.85, width: 0.5, depth: 0.4 },
    { kind: "floor_marker", z: -1.7, width: 0.5, depth: 0.4 },
    { kind: "floor_marker", z: -2.55, width: 0.55, depth: 0.45 },
  ],
};

export const JUMP_TESTS: MotionSpec[] = [verticalJumpTest, standingTripleJumpTest];
