import * as THREE from "three";
import { createHumanoidRig } from "./humanoid";
import { type MotionSpec, type SceneProp } from "./motion-spec";
import { computePose, type PosedRig } from "./rig";
import { createAvatarRig } from "./avatar-rig";
import { loadCoachModel } from "./coach-model";
import type { PlaybackHandle } from "./playback";
import { BOUNDS_PADDING, cameraFor, collectBones, expandByBones } from "./framing";

// Standard mint tone for kit-style props (boxes, dumbbells, cones).
const PROP_KIT = 0x38bdf8;
const PROP_METAL = 0x8290a8;

// Attach a prop to the appropriate scene / rig node. Held/chest weights
// parent to a joint so the animation carries them; static props go into
// the scene root.
function addProp(
  scene: THREE.Scene,
  rig: PosedRig,
  prop: SceneProp,
  disposables: THREE.BufferGeometry[],
  bands: Array<() => void>,
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
      const parent = rig.attach(prop.side === "L" ? "elbowL" : "elbowR");
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
    case "band": {
      // Drawn as a thin cylinder rebuilt each frame between the anchor and
      // the grip, so it tracks and stretches with the movement.
      const geom = push(new THREE.CylinderGeometry(0.012, 0.012, 1, 6));
      const mat = new THREE.MeshStandardMaterial({
        color: prop.color ?? 0x8290a8,
        roughness: 0.9,
      });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);

      const anchor = new THREE.Vector3(prop.anchor[0], prop.anchor[1], prop.anchor[2]);
      const grips: THREE.Object3D[] =
        prop.grip === "L"
          ? [rig.attach("elbowL")]
          : prop.grip === "R"
            ? [rig.attach("elbowR")]
            : [rig.attach("elbowL"), rig.attach("elbowR")];

      const hand = new THREE.Vector3();
      const mid = new THREE.Vector3();
      bands.push(() => {
        mid.set(0, 0, 0);
        for (const grip of grips) {
          // The hand sits below the elbow joint — same offset the held
          // weight uses.
          hand.set(0, -0.3, 0).applyMatrix4(grip.matrixWorld);
          mid.add(hand);
        }
        mid.divideScalar(grips.length);
        const length = anchor.distanceTo(mid);
        mesh.position.copy(anchor).add(mid).multiplyScalar(0.5);
        mesh.scale.set(1, Math.max(length, 0.001), 1);
        // Cylinders run along Y; aim it at the anchor.
        mesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          mid.clone().sub(anchor).normalize(),
        );
      });
      return mat;
    }
    case "chest_weight": {
      const size = prop.size ?? 0.16;
      // Parent to the spine so it stays with the torso. Position at the
      // chest, slightly forward, between the two forward-and-out arms.
      const parent = rig.attach("spine");
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

export type SceneHandle = PlaybackHandle;

export type MountExerciseOptions = {
  onReady?: () => void;
  /** Called when the avatar couldn't load and the stick figure stood in. */
  onFallback?: (err: unknown) => void;
};

export function mountExerciseScene(
  container: HTMLElement,
  spec: MotionSpec,
  { onReady, onFallback }: MountExerciseOptions = {},
): SceneHandle {
  let disposed = false;
  const width = container.clientWidth || 320;
  const height = container.clientHeight || 320;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x0f141c, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);
  // Framed once the rig is installed and its bounds are known.
  camera.position.set(2.4, 1.5, 3.2);
  camera.lookAt(0, 1.0, 0);

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0x8290a8, 0.5));
  const rim = new THREE.DirectionalLight(0x38bdf8, 0.35);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  const grid = new THREE.GridHelper(20, 20, 0x2e3849, 0x1a2130);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.5;
  scene.add(grid);

  // The rig arrives with the avatar model, so the scene is built empty and
  // populated on load. The stick figure stands in if the model can't be
  // fetched — a pilot that still animates beats an empty box.
  let rig: PosedRig | null = null;
  const propDisposables: THREE.BufferGeometry[] = [];
  const propMaterials: THREE.Material[] = [];
  // Scene-level props (a box, cones, a wall) must stay in frame; props
  // parented to a joint travel with the rig and are already covered.
  const propMeshes: THREE.Object3D[] = [];
  // Props that have to be redrawn each frame (bands stretch as the rig moves).
  const bandUpdaters: Array<() => void> = [];

  // What the camera has to keep in shot: the skeleton across the whole rep,
  // plus any props, since a box jump is unreadable without its box.
  let bounds: THREE.Box3 | null = null;

  const sweepPoseBounds = (posed: PosedRig): THREE.Box3 => {
    const bones = collectBones(posed.root);
    const box = new THREE.Box3();
    const point = new THREE.Vector3();
    const SAMPLES = 32;
    const span = spec.repDurationSec + (spec.restBetweenRepsSec ?? 0);
    for (let i = 0; i <= SAMPLES; i++) {
      posed.applyPose(computePose(spec, (i / SAMPLES) * span));
      posed.root.updateMatrixWorld(true);
      if (bones.length) expandByBones(box, bones, point);
      else box.expandByObject(posed.root);
    }
    box.expandByScalar(BOUNDS_PADDING);
    for (const propMesh of propMeshes) box.expandByObject(propMesh);
    return box;
  };

  const frame = () => {
    if (!bounds) return;
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    const { position, target } = cameraFor(bounds, w / h, camera.fov);
    camera.position.copy(position);
    camera.lookAt(target);
  };

  // Sweeps the whole rep to find how far the rig's lowest sole strays below
  // the grid, then lifts it by that much. The spec's joint angles were
  // authored against the stick figure's proportions, and the avatar's legs
  // are ~12cm longer per side, so without this it walks through the floor.
  const groundRig = (next: PosedRig) => {
    next.setGroundOffset(0);
    let lowest = Infinity;
    const SAMPLES = 48;
    const span = spec.repDurationSec + (spec.restBetweenRepsSec ?? 0);
    for (let i = 0; i <= SAMPLES; i++) {
      next.applyPose(computePose(spec, (i / SAMPLES) * span));
      lowest = Math.min(lowest, next.lowestPoint());
    }
    if (Number.isFinite(lowest)) next.setGroundOffset(-lowest);
  };

  const installRig = (next: PosedRig) => {
    rig = next;
    scene.add(next.root);
    groundRig(next);
    bounds = sweepPoseBounds(next);
    frame();
    if (spec.props) {
      for (const p of spec.props) {
        const before = scene.children.length;
        const mat = addProp(scene, next, p, propDisposables, bandUpdaters);
        if (mat) propMaterials.push(mat);
        // Anything addProp put straight into the scene is static geometry
        // the camera has to include.
        for (let i = before; i < scene.children.length; i++) {
          propMeshes.push(scene.children[i]);
        }
      }
    }
    lastFrame = performance.now();
  };

  let rafId = 0;
  // Driven by an accumulator rather than wall-clock elapsed time, so pausing
  // and slowing down don't jump the animation.
  let elapsed = 0;
  let lastFrame = performance.now();
  let paused = false;
  let speed = 1;

  const onResize = () => {
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    frame();
  };
  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(container);

  // Don't burn a phone's battery animating a canvas that's scrolled away.
  let onScreen = true;
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      // Skip the gap it was hidden for instead of fast-forwarding through it.
      lastFrame = performance.now();
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(container);

  const tick = () => {
    rafId = requestAnimationFrame(tick);
    const now = performance.now();
    const delta = (now - lastFrame) / 1000;
    lastFrame = now;
    if (!onScreen) return;
    if (!paused) elapsed += delta * speed;
    if (rig) {
      rig.applyPose(computePose(spec, elapsed));
      if (bandUpdaters.length) {
        rig.root.updateMatrixWorld(true);
        for (const update of bandUpdaters) update();
      }
    }
    renderer.render(scene, camera);
  };
  rafId = requestAnimationFrame(tick);

  loadCoachModel()
    .then((source) => {
      if (disposed) return;
      installRig(createAvatarRig(source));
      onReady?.();
    })
    .catch((err) => {
      if (disposed) return;
      installRig(createHumanoidRig());
      onFallback?.(err);
      onReady?.();
    });

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      rig?.dispose();
      for (const g of propDisposables) g.dispose();
      for (const m of propMaterials) m.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
    setPaused(next) {
      paused = next;
    },
    setSpeed(next) {
      speed = next;
    },
  };
}
