import * as THREE from "three";
import type { JointName } from "./humanoid";
import { sampleTrack, timeToRepT, type MotionSpec, type Vec3 } from "./motion-spec";

// A pose is one frame of a MotionSpec, resolved to plain numbers: per-joint
// Euler XYZ rotation in DEGREES, relative to the rig's rest pose, plus an
// optional whole-body offset in metres carried on the pelvis.
export type Pose = {
  rotationDeg: Partial<Record<JointName, Vec3>>;
  offset: Vec3;
};

// Anything that can wear a Pose. The procedural humanoid and the retargeted
// 3D Coach avatar both implement this, so the scene doesn't care which is
// mounted.
export type PosedRig = {
  root: THREE.Object3D;
  applyPose: (pose: Pose) => void;
  /**
   * A node to hang a prop off, whose local frame matches the procedural
   * rig's joint frame at rest — so prop offsets authored in metres against
   * the stick figure land in the same place on the avatar.
   */
  attach: (joint: JointName) => THREE.Object3D;
  /**
   * World Y of the rig's lowest contact point (the soles) in its current
   * pose. Used to sit the rig on the floor rather than through it.
   */
  lowestPoint: () => number;
  /** A constant lift applied on top of the pose's own offset. */
  setGroundOffset: (y: number) => void;
  dispose: () => void;
};

const ZERO_V3: Vec3 = [0, 0, 0];

export function computePose(spec: MotionSpec, elapsed: number): Pose {
  const { t } = timeToRepT(elapsed, spec);
  const rotationDeg: Partial<Record<JointName, Vec3>> = {};
  let offset: Vec3 = ZERO_V3;

  for (const key in spec.tracks) {
    const joint = key as JointName;
    const track = spec.tracks[joint];
    if (!track) continue;
    if (track.rotationDeg) {
      rotationDeg[joint] = sampleTrack(track.rotationDeg, t, ZERO_V3);
    }
    if (track.position && joint === "pelvis") {
      offset = sampleTrack(track.position, t, ZERO_V3);
    }
  }

  return { rotationDeg, offset };
}
