import * as THREE from "three";
import { buildHumanoid, type JointName, type HumanoidRig } from "./humanoid";
import { sampleTrack, timeToRepT, type MotionSpec, type SceneProp, type Vec3 } from "./motion-spec";

const DEG = Math.PI / 180;
const ZERO_V3: Vec3 = [0, 0, 0];

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

// Standard mint tone for kit-style props (boxes, dumbbells, cones).
const PROP_KIT = 0x2ecc94;
const PROP_METAL = 0x8290a8;

// Attach a prop to the appropriate scene / rig node. Held/chest weights
// parent to a joint so the animation carries them; static props go into
// the scene root.
function addProp(
  scene: THREE.Scene,
  rig: HumanoidRig,
  prop: SceneProp,
  disposables: THREE.BufferGeometry[],
) {
  const push = (geom: THREE.BufferGeometry) => {
    disposables.push(geom);
    return geom;
  };

  switch (prop.kind) {
    case "box": {
      const width = prop.width ?? 0.5;
      const height = prop.height;
      const depth = prop.depth ?? 0.4;
      const geom = push(new THREE.BoxGeometry(width, height, depth));
      const mat = new THREE.MeshStandardMaterial({
        color: prop.color ?? PROP_KIT,
        roughness: 0.6,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(prop.x ?? 0, height / 2, prop.z ?? 0);
      scene.add(mesh);
      return mat;
    }
    case "wall": {
      const width = prop.width ?? 3;
      const height = prop.height ?? 2.5;
      const geom = push(new THREE.PlaneGeometry(width, height));
      const mat = new THREE.MeshStandardMaterial({
        color: prop.color ?? 0x2e3849,
        roughness: 0.9,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(0, height / 2, prop.z);
      scene.add(mesh);
      return mat;
    }
    case "floor_marker": {
      const width = prop.width ?? 0.6;
      const depth = prop.depth ?? 0.6;
      const geom = push(new THREE.PlaneGeometry(width, depth));
      const mat = new THREE.MeshStandardMaterial({
        color: prop.color ?? PROP_KIT,
        transparent: true,
        opacity: 0.55,
        roughness: 1.0,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, 0.01, prop.z);
      scene.add(mesh);
      return mat;
    }
    case "cone": {
      const height = prop.height ?? 0.18;
      const geom = push(new THREE.ConeGeometry(0.07, height, 12));
      const mat = new THREE.MeshStandardMaterial({
        color: prop.color ?? 0xe08a1c,
        roughness: 0.7,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(prop.x, height / 2, prop.z);
      scene.add(mesh);
      return mat;
    }
    case "held_weight": {
      const size = prop.size ?? 0.12;
      // Parent to the elbow joint at the same position the hand mesh occupies.
      const parent =
        prop.side === "L" ? rig.joints.elbowL : rig.joints.elbowR;
      const geom = push(new THREE.BoxGeometry(size * 1.4, size, size * 1.4));
      const mat = new THREE.MeshStandardMaterial({
        color: PROP_METAL,
        roughness: 0.3,
        metalness: 0.6,
      });
      const mesh = new THREE.Mesh(geom, mat);
      // Hand mesh sits at y=-0.26 from the elbow; place the weight just
      // below the hand so it reads as being gripped.
      mesh.position.set(0, -0.34, 0);
      parent.add(mesh);
      return mat;
    }
    case "chest_weight": {
      const size = prop.size ?? 0.16;
      // Parent to the spine so it stays with the torso. Position at the
      // chest, slightly forward, between the two forward-and-out arms.
      const parent = rig.joints.spine;
      const geom = push(new THREE.BoxGeometry(size, size, size * 0.9));
      const mat = new THREE.MeshStandardMaterial({
        color: PROP_METAL,
        roughness: 0.3,
        metalness: 0.6,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(0, 0.42, 0.18);
      parent.add(mesh);
      return mat;
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

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0x8290a8, 0.5));
  const rim = new THREE.DirectionalLight(0x2ecc94, 0.35);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  const grid = new THREE.GridHelper(8, 16, 0x2e3849, 0x1a2130);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.5;
  scene.add(grid);

  const rig = buildHumanoid();
  scene.add(rig.root);
  const rest = captureRestPose(rig);

  const propDisposables: THREE.BufferGeometry[] = [];
  const propMaterials: THREE.Material[] = [];
  if (spec.props) {
    for (const p of spec.props) {
      const mat = addProp(scene, rig, p, propDisposables);
      if (mat) propMaterials.push(mat);
    }
  }

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
      for (const g of propDisposables) g.dispose();
      for (const m of propMaterials) m.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
