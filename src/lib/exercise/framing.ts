import * as THREE from "three";

// Camera fit target, expressed against the swept bounding box's projected
// corners. It exceeds 1 because those corners overshoot the figure itself on
// a three-quarter view — at 1.1 the body lands at 65-82% of the frame across
// the clip library, leaving ~18% for the mesh wrapped around the bones.
// Above ~1.3 hands and feet start leaving the frame.
const FRAME_FIT = 1.1;

// Bones sit inside the body, and props sit around it — pad the swept box out
// to cover the mesh.
export const BOUNDS_PADDING = 0.35;

export function collectBones(root: THREE.Object3D): THREE.Bone[] {
  const bones: THREE.Bone[] = [];
  root.traverse((o) => {
    if ((o as THREE.Bone).isBone) bones.push(o as THREE.Bone);
  });
  return bones;
}

// Expands `box` to cover every bone's current world position. Skinned meshes
// report their bind-pose bounds rather than the posed ones, so framing has to
// be measured from the skeleton — otherwise a plank sits tiny in the middle
// of a frame sized for a standing rig.
export function expandByBones(box: THREE.Box3, bones: THREE.Bone[], point: THREE.Vector3) {
  for (const bone of bones) box.expandByPoint(point.setFromMatrixPosition(bone.matrixWorld));
}

// Floor movements (plank, sit-ups) run along Z; standing ones are tall. View
// the long axis side-on so the whole shape is legible either way.
export function cameraFor(box: THREE.Box3, aspect: number, fovDeg: number) {
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const isFloorMovement = size.z > size.y;

  const dir = isFloorMovement
    ? new THREE.Vector3(1, 0.42, 0.45).normalize()
    : new THREE.Vector3(0.62, 0.28, 1).normalize();

  // Fitting the box's bounding radius leaves a tall thin figure filling
  // barely half the frame, so the distance is refined against the actual
  // projected corners instead. Perspective isn't linear in distance, but
  // this converges in a couple of passes.
  const corners: THREE.Vector3[] = [];
  for (const x of [box.min.x, box.max.x]) {
    for (const y of [box.min.y, box.max.y]) {
      for (const z of [box.min.z, box.max.z]) corners.push(new THREE.Vector3(x, y, z));
    }
  }

  const fov = (fovDeg * Math.PI) / 180;
  let distance = (size.length() / 2 / Math.tan(fov / 2)) * 1.2;

  const probe = new THREE.PerspectiveCamera(fovDeg, aspect, 0.1, 1000);
  const point = new THREE.Vector3();
  for (let pass = 0; pass < 4; pass++) {
    probe.position.copy(dir).multiplyScalar(distance).add(center);
    probe.lookAt(center);
    probe.updateMatrixWorld(true);
    probe.updateProjectionMatrix();

    let extent = 0;
    for (const corner of corners) {
      point.copy(corner).project(probe);
      extent = Math.max(extent, Math.abs(point.x), Math.abs(point.y));
    }
    if (extent === 0) break;
    distance *= extent / FRAME_FIT;
  }

  return {
    position: dir.clone().multiplyScalar(distance).add(center),
    target: center,
  };
}
