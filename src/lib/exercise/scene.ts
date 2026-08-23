import * as THREE from "three";
import { buildHumanoid, type JointName, type HumanoidRig } from "./humanoid";
import { sampleTrack, timeToRepT, type MotionSpec, type Vec3 } from "./motion-spec";

const DEG = Math.PI / 180;
const ZERO_V3: Vec3 = [0, 0, 0];

// Snapshot of each joint's rest pose so tracks are additive, not absolute.
// (A joint without a track keeps its rest pose; a track expresses the delta
// from rest, which makes it much easier to author.)
type RestPose = Record<JointName, { position: THREE.Vector3; rotation: THREE.Euler }>;

function captureRestPose(rig: HumanoidRig): RestPose {
  const rest: Partial<RestPose> = {};
  for (const name in rig.joints) {
    const j = rig.joints[name as JointName];
    rest[name as JointName] = {
      position: j.position.clone(),
      rotation: j.rotation.clone(),
    };
  }
  return rest as RestPose;
}

function applySpec(rig: HumanoidRig, rest: RestPose, spec: MotionSpec, elapsed: number) {
  const { t } = timeToRepT(elapsed, spec);

  for (const name in rig.joints) {
    const joint = rig.joints[name as JointName];
    const restPose = rest[name as JointName];
    const track = spec.tracks[name as JointName];

    if (!track) {
      joint.rotation.copy(restPose.rotation);
      joint.position.copy(restPose.position);
      continue;
    }

    if (track.rotationDeg) {
      const [x, y, z] = sampleTrack(track.rotationDeg, t, ZERO_V3);
      joint.rotation.set(
        restPose.rotation.x + x * DEG,
        restPose.rotation.y + y * DEG,
        restPose.rotation.z + z * DEG,
      );
    } else {
      joint.rotation.copy(restPose.rotation);
    }

    if (track.position) {
      const [x, y, z] = sampleTrack(track.position, t, ZERO_V3);
      joint.position.set(
        restPose.position.x + x,
        restPose.position.y + y,
        restPose.position.z + z,
      );
    } else {
      joint.position.copy(restPose.position);
    }
  }
}

export type SceneHandle = {
  dispose: () => void;
};

export function mountExerciseScene(
  container: HTMLElement,
  spec: MotionSpec,
): SceneHandle {
  const width = container.clientWidth || 320;
  const height = container.clientHeight || 320;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x0f141c, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0f141c, 4, 10);

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
  camera.position.set(2.4, 1.5, 3.2);
  camera.lookAt(0, 1.0, 0);

  // Lights — key + fill.
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0x8290a8, 0.5));
  const rim = new THREE.DirectionalLight(0x2ecc94, 0.35);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  // Floor grid — subtle so the humanoid pops.
  const grid = new THREE.GridHelper(8, 16, 0x2e3849, 0x1a2130);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.5;
  scene.add(grid);

  const rig = buildHumanoid();
  scene.add(rig.root);
  const rest = captureRestPose(rig);

  let rafId = 0;
  const start = performance.now();

  const onResize = () => {
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(container);

  const tick = () => {
    const elapsed = (performance.now() - start) / 1000;
    applySpec(rig, rest, spec, elapsed);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return {
    dispose() {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      rig.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
