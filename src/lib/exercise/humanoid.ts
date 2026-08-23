import * as THREE from "three";

// Named joints the MotionSpec can drive. Rest pose = all rotations at 0,
// pelvis at (0, 0.9, 0), arms hanging at sides, body facing -Z.
export type JointName =
  | "pelvis"
  | "spine"
  | "neck"
  | "shoulderL"
  | "shoulderR"
  | "elbowL"
  | "elbowR"
  | "hipL"
  | "hipR"
  | "kneeL"
  | "kneeR"
  | "ankleL"
  | "ankleR";

export type Joints = Record<JointName, THREE.Object3D>;

export type HumanoidRig = {
  root: THREE.Group;
  joints: Joints;
  dispose: () => void;
};

const BODY_COLOR = 0x2ecc94; // mint
const LIMB_COLOR = 0xb6bfd0; // muted-strong

export function buildHumanoid(): HumanoidRig {
  const root = new THREE.Group();
  root.name = "humanoid";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: BODY_COLOR,
    roughness: 0.7,
    metalness: 0.0,
  });
  const limbMat = new THREE.MeshStandardMaterial({
    color: LIMB_COLOR,
    roughness: 0.8,
    metalness: 0.0,
  });

  const disposables: Array<{ dispose: () => void }> = [bodyMat, limbMat];

  const makeMesh = (
    geom: THREE.BufferGeometry,
    mat: THREE.Material,
    yOffset: number,
  ) => {
    disposables.push(geom);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.y = yOffset;
    mesh.castShadow = true;
    return mesh;
  };

  // Pelvis at hip height, animates position for jumps and translation.
  const pelvis = new THREE.Object3D();
  pelvis.name = "pelvis";
  pelvis.position.set(0, 0.92, 0);
  root.add(pelvis);

  // Spine — a short pivot that rotates the whole torso.
  const spine = new THREE.Object3D();
  spine.name = "spine";
  spine.position.set(0, 0.05, 0);
  pelvis.add(spine);
  // Torso mesh hangs off spine, centered above pivot.
  spine.add(makeMesh(new THREE.BoxGeometry(0.4, 0.5, 0.22), bodyMat, 0.25));

  // Neck + head
  const neck = new THREE.Object3D();
  neck.name = "neck";
  neck.position.set(0, 0.55, 0);
  spine.add(neck);
  neck.add(makeMesh(new THREE.SphereGeometry(0.12, 16, 12), bodyMat, 0.12));

  // Shoulders — pivot at top corners of torso.
  const buildArm = (side: "L" | "R"): [THREE.Object3D, THREE.Object3D] => {
    const sign = side === "L" ? -1 : 1;

    const shoulder = new THREE.Object3D();
    shoulder.name = `shoulder${side}`;
    shoulder.position.set(sign * 0.22, 0.5, 0);
    spine.add(shoulder);

    // Upper arm mesh — cylinder along -Y from pivot.
    shoulder.add(
      makeMesh(new THREE.CylinderGeometry(0.045, 0.045, 0.25, 12), limbMat, -0.125),
    );

    const elbow = new THREE.Object3D();
    elbow.name = `elbow${side}`;
    elbow.position.set(0, -0.25, 0);
    shoulder.add(elbow);
    elbow.add(
      makeMesh(new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12), limbMat, -0.11),
    );
    // Hand nub — small box at end of forearm.
    elbow.add(makeMesh(new THREE.BoxGeometry(0.08, 0.09, 0.04), limbMat, -0.26));

    return [shoulder, elbow];
  };

  const [shoulderL, elbowL] = buildArm("L");
  const [shoulderR, elbowR] = buildArm("R");

  // Hips + legs
  const buildLeg = (side: "L" | "R"): [THREE.Object3D, THREE.Object3D, THREE.Object3D] => {
    const sign = side === "L" ? -1 : 1;

    const hip = new THREE.Object3D();
    hip.name = `hip${side}`;
    hip.position.set(sign * 0.1, -0.05, 0);
    pelvis.add(hip);
    hip.add(
      makeMesh(new THREE.CylinderGeometry(0.07, 0.06, 0.32, 12), limbMat, -0.16),
    );

    const knee = new THREE.Object3D();
    knee.name = `knee${side}`;
    knee.position.set(0, -0.32, 0);
    hip.add(knee);
    knee.add(
      makeMesh(new THREE.CylinderGeometry(0.055, 0.05, 0.32, 12), limbMat, -0.16),
    );

    const ankle = new THREE.Object3D();
    ankle.name = `ankle${side}`;
    ankle.position.set(0, -0.32, 0);
    knee.add(ankle);
    // Foot — small box, offset forward.
    ankle.add(makeMesh(new THREE.BoxGeometry(0.09, 0.05, 0.2), limbMat, -0.02));

    return [hip, knee, ankle];
  };

  const [hipL, kneeL, ankleL] = buildLeg("L");
  const [hipR, kneeR, ankleR] = buildLeg("R");

  const joints: Joints = {
    pelvis,
    spine,
    neck,
    shoulderL,
    shoulderR,
    elbowL,
    elbowR,
    hipL,
    hipR,
    kneeL,
    kneeR,
    ankleL,
    ankleR,
  };

  return {
    root,
    joints,
    dispose() {
      for (const d of disposables) d.dispose();
    },
  };
}
