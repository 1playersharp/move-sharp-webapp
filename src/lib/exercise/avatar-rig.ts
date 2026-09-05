import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { JointName } from "./humanoid";
import type { Pose, PosedRig } from "./rig";
import type { LoadedCoach } from "./coach-model";
import type { Vec3 } from "./motion-spec";

// Retargets the procedural MotionSpecs onto the captured 3D Coach avatar, so
// every exercise shows the same character whether or not it has a motion
// capture clip.
//
// The two rigs disagree about almost everything: the stick figure rests with
// every rotation at zero, arms hanging, facing -Z, and measures in metres.
// The Mixamo rig rests in a T-pose facing +Z with its own per-bone local axes
// and its own scale. Rather than hand-authoring a correction per bone, this
// aligns the avatar into the stick figure's rest pose once at build time, then
// applies each frame's joint rotations as WORLD-space deltas. Working in world
// space is what makes the per-bone axis differences cancel out — a knee
// flexion authored as +X in the spec stays a +X flexion on the avatar.

const BONE_SUFFIX: Record<JointName, string> = {
  pelvis: "Hips",
  spine: "Spine1",
  neck: "Neck",
  shoulderL: "LeftArm",
  shoulderR: "RightArm",
  elbowL: "LeftForeArm",
  elbowR: "RightForeArm",
  hipL: "LeftUpLeg",
  hipR: "RightUpLeg",
  kneeL: "LeftLeg",
  kneeR: "RightLeg",
  ankleL: "LeftFoot",
  ankleR: "RightFoot",
};

// The avatar bone each joint points at, used to measure its rest direction.
const AIM_SUFFIX: Partial<Record<JointName, string>> = {
  spine: "Neck",
  shoulderL: "LeftForeArm",
  shoulderR: "RightForeArm",
  elbowL: "LeftHand",
  elbowR: "RightHand",
  hipL: "LeftLeg",
  hipR: "RightLeg",
  kneeL: "LeftFoot",
  kneeR: "RightFoot",
  ankleL: "LeftToeBase",
  ankleR: "RightToeBase",
};

// Where each limb points in the stick figure's rest pose (world space, with
// the body facing -Z). Everything hangs down except the spine, and the feet
// point forward.
const REST_DIR: Partial<Record<JointName, Vec3>> = {
  spine: [0, 1, 0],
  shoulderL: [0, -1, 0],
  shoulderR: [0, -1, 0],
  elbowL: [0, -1, 0],
  elbowR: [0, -1, 0],
  hipL: [0, -1, 0],
  hipR: [0, -1, 0],
  kneeL: [0, -1, 0],
  kneeR: [0, -1, 0],
  ankleL: [0, 0, -1],
  ankleR: [0, 0, -1],
};

// Parents first — a joint's world rotation depends on its ancestors'.
const ORDER: JointName[] = [
  "pelvis",
  "spine",
  "neck",
  "shoulderL",
  "elbowL",
  "shoulderR",
  "elbowR",
  "hipL",
  "kneeL",
  "ankleL",
  "hipR",
  "kneeR",
  "ankleR",
];

const PARENT_JOINT: Partial<Record<JointName, JointName>> = {
  spine: "pelvis",
  neck: "spine",
  shoulderL: "spine",
  elbowL: "shoulderL",
  shoulderR: "spine",
  elbowR: "shoulderR",
  hipL: "pelvis",
  kneeL: "hipL",
  ankleL: "kneeL",
  hipR: "pelvis",
  kneeR: "hipR",
  ankleR: "kneeR",
};

// Hip height of the stick figure, in metres. The avatar is scaled to match so
// that spec offsets, prop sizes and the camera all keep working unchanged.
const PELVIS_HEIGHT = 0.92;

function findBone(root: THREE.Object3D, suffix: string): THREE.Bone | null {
  let found: THREE.Bone | null = null;
  root.traverse((o) => {
    // GLTFLoader sanitises "mixamorig:LeftArm" to "mixamorigLeftArm".
    if (!found && (o as THREE.Bone).isBone && o.name.endsWith(suffix)) {
      found = o as THREE.Bone;
    }
  });
  return found;
}

export function createAvatarRig(source: LoadedCoach): PosedRig {
  // The offset group carries the pelvis translation track; the avatar itself
  // is scaled and turned to face the stick figure's forward direction.
  const root = new THREE.Group();
  const model = cloneSkeleton(source.scene) as THREE.Group;
  root.add(model);

  model.rotation.y = Math.PI; // Mixamo faces +Z, the specs assume -Z
  model.updateMatrixWorld(true);

  const bones = {} as Record<JointName, THREE.Bone>;
  for (const joint of ORDER) {
    const bone = findBone(model, BONE_SUFFIX[joint]);
    if (!bone) throw new Error(`avatar is missing a bone for "${joint}"`);
    bones[joint] = bone;
  }

  // Scale to metric so a 0.92m pelvis lands at 0.92 world units.
  const hipsWorld = new THREE.Vector3().setFromMatrixPosition(bones.pelvis.matrixWorld);
  if (hipsWorld.y > 0) {
    model.scale.multiplyScalar(PELVIS_HEIGHT / hipsWorld.y);
    model.updateMatrixWorld(true);
  }

  // --- Align the T-pose into the stick figure's rest pose ------------------
  const from = new THREE.Vector3();
  const to = new THREE.Vector3();
  const swing = new THREE.Quaternion();
  const boneWorld = new THREE.Quaternion();
  const parentWorld = new THREE.Quaternion();

  for (const joint of ORDER) {
    const target = REST_DIR[joint];
    const aimSuffix = AIM_SUFFIX[joint];
    if (!target || !aimSuffix) continue;
    const aim = findBone(model, aimSuffix);
    if (!aim) continue;

    model.updateMatrixWorld(true);
    from
      .setFromMatrixPosition(aim.matrixWorld)
      .sub(to.setFromMatrixPosition(bones[joint].matrixWorld))
      .normalize();
    to.set(target[0], target[1], target[2]).normalize();
    if (from.lengthSq() === 0) continue;

    // Shortest-arc rotation that swings this limb onto the rest direction,
    // applied in world space and converted back into the bone's local frame.
    swing.setFromUnitVectors(from, to);
    bones[joint].getWorldQuaternion(boneWorld);
    bones[joint].parent?.getWorldQuaternion(parentWorld) ?? parentWorld.identity();
    bones[joint].quaternion.copy(parentWorld.invert().multiply(swing).multiply(boneWorld));
    bones[joint].updateMatrixWorld(true);
  }

  model.updateMatrixWorld(true);

  // World rotation of each joint once it's in the rest pose. Every animated
  // frame is a delta from these.
  const restWorld = {} as Record<JointName, THREE.Quaternion>;
  for (const joint of ORDER) {
    restWorld[joint] = bones[joint].getWorldQuaternion(new THREE.Quaternion());
  }

  // Bones between two mapped joints (Spine, Spine2, …) never rotate, so the
  // fixed twist they contribute is baked once here. That keeps applyPose to a
  // dozen quaternion multiplies with no scene-graph walking per frame.
  const parentBridge = {} as Record<JointName, THREE.Quaternion>;
  for (const joint of ORDER) {
    const directParentWorld =
      bones[joint].parent?.getWorldQuaternion(new THREE.Quaternion()) ?? new THREE.Quaternion();
    const anchor = PARENT_JOINT[joint];
    parentBridge[joint] = anchor
      ? restWorld[anchor].clone().invert().multiply(directParentWorld)
      : directParentWorld;
  }

  const euler = new THREE.Euler();
  const delta = new THREE.Quaternion();
  const world = new THREE.Quaternion();
  const parentOf = new THREE.Quaternion();
  const IDENTITY = new THREE.Quaternion();
  // The avatar's world rotation per joint this frame, and the accumulated
  // spec rotation down the chain.
  const currentWorld = {} as Record<JointName, THREE.Quaternion>;
  const accumulated = {} as Record<JointName, THREE.Quaternion>;
  for (const joint of ORDER) {
    currentWorld[joint] = new THREE.Quaternion();
    accumulated[joint] = new THREE.Quaternion();
  }

  const DEG = Math.PI / 180;

  // Toe bones, and their height in the rest pose — the soles sit that far
  // below them, so the difference is the sole's height off the floor.
  const toes = [findBone(model, "LeftToeBase"), findBone(model, "RightToeBase")].filter(
    (b): b is THREE.Bone => b !== null,
  );
  model.updateMatrixWorld(true);
  const toeRestY = toes.length
    ? Math.min(...toes.map((t) => new THREE.Vector3().setFromMatrixPosition(t.matrixWorld).y))
    : 0;

  let groundOffset = 0;
  const scratch = new THREE.Vector3();
  // Every bone in the skeleton, not just the 13 the specs drive — a push-up
  // rests on its HANDS, which aren't a mapped joint, so grounding that only
  // looked at mapped joints let them sink through the floor.
  const allBones: THREE.Object3D[] = [];
  model.traverse((o) => {
    if ((o as THREE.Bone).isBone) allBones.push(o);
  });

  // Roughly how far the body surface sits below a bone's centre line. Used
  // for floor movements, where the contact point is a forearm or a back
  // rather than a foot.
  const FLESH = 0.08;

  function lowestPoint(): number {
    root.updateMatrixWorld(true);
    let lowest = Infinity;
    // Standing: the sole is a known distance below the toe bone.
    for (const toe of toes) {
      lowest = Math.min(lowest, scratch.setFromMatrixPosition(toe.matrixWorld).y - toeRestY);
    }
    // Lying or supported: any bone can be the contact point (a push-up rests
    // on hands and toes, a deadbug on the whole back).
    for (const bone of allBones) {
      lowest = Math.min(lowest, scratch.setFromMatrixPosition(bone.matrixWorld).y - FLESH);
    }
    return lowest === Infinity ? root.position.y : lowest;
  }

  function applyPose(pose: Pose) {
    root.position.set(pose.offset[0], pose.offset[1] + groundOffset, pose.offset[2]);

    for (const joint of ORDER) {
      const rot = pose.rotationDeg[joint];
      // YXZ — see the note in humanoid.ts: heading outermost, lean in the
      // body frame.
      if (rot) euler.set(rot[0] * DEG, rot[1] * DEG, rot[2] * DEG, "YXZ");
      else euler.set(0, 0, 0, "YXZ");
      delta.setFromEuler(euler);

      const anchor = PARENT_JOINT[joint];

      // Spec rotations are local to each joint, so they compound down the
      // chain exactly as they do on the stick figure: a bent hip carries the
      // knee with it. Accumulating here is what keeps a squat a squat.
      accumulated[joint].copy(anchor ? accumulated[anchor] : IDENTITY).multiply(delta);

      // That accumulated rotation is the joint's world rotation on the stick
      // figure (whose rest pose is all-identity), so it's the world-space
      // delta to apply to the avatar's aligned rest pose.
      world.copy(accumulated[joint]).multiply(restWorld[joint]);
      currentWorld[joint].copy(world);

      parentOf
        .copy(anchor ? currentWorld[anchor] : IDENTITY)
        .multiply(parentBridge[joint]);

      bones[joint].quaternion.copy(parentOf.invert().multiply(world));
    }
  }

  // Props are authored in the stick figure's joint frames, which are all
  // world-aligned at rest. Cancelling the bone's rest rotation and scale gives
  // a node where those offsets mean the same thing.
  const attachments = new Map<JointName, THREE.Object3D>();
  function attach(joint: JointName): THREE.Object3D {
    const existing = attachments.get(joint);
    if (existing) return existing;

    const bone = bones[joint];
    const node = new THREE.Object3D();
    node.quaternion.copy(restWorld[joint]).invert();
    const scale = bone.getWorldScale(new THREE.Vector3());
    node.scale.set(
      scale.x ? 1 / scale.x : 1,
      scale.y ? 1 / scale.y : 1,
      scale.z ? 1 / scale.z : 1,
    );
    bone.add(node);
    attachments.set(joint, node);
    return node;
  }

  return {
    root,
    applyPose,
    attach,
    lowestPoint,
    setGroundOffset(y: number) {
      groundOffset = y;
    },
    dispose() {
      // Geometries and materials belong to the cached source model and are
      // shared with every other canvas on the page, so only the clone's own
      // graph is detached.
      root.clear();
    },
  };
}
