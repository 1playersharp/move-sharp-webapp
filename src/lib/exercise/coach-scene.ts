import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { type CoachClip } from "./coach-clips";
import { loadCoachModel } from "./coach-model";
import type { PlaybackHandle } from "./playback";
import { BOUNDS_PADDING, cameraFor, collectBones, expandByBones } from "./framing";

// Sweeps the skeleton across a captured clip to find what the camera has to
// frame.
function sweepClipBounds(
  root: THREE.Object3D,
  mixer: THREE.AnimationMixer,
  clip: THREE.AnimationClip,
  samples = 32,
): THREE.Box3 {
  const bones = collectBones(root);
  const box = new THREE.Box3();
  const point = new THREE.Vector3();
  for (let i = 0; i <= samples; i++) {
    mixer.setTime((i / samples) * clip.duration);
    root.updateMatrixWorld(true);
    expandByBones(box, bones, point);
  }
  mixer.setTime(0);
  return box.expandByScalar(BOUNDS_PADDING);
}

// Shared with the procedural pilot scene so both demos read as one system.
const BG = 0x0f141c;
const GRID_MAJOR = 0x2e3849;
const GRID_MINOR = 0x1a2130;
const BRAND = 0x38bdf8;

export type CoachSceneHandle = PlaybackHandle;

export type MountCoachOptions = {
  clipName: CoachClip;
  onReady?: () => void;
  onError?: (err: unknown) => void;
};

export function mountCoachScene(
  container: HTMLElement,
  { clipName, onReady, onError }: MountCoachOptions,
): CoachSceneHandle {
  let disposed = false;
  // Applied once the model arrives — the controls are live before then.
  let paused = false;
  let speed = 1;
  let action: THREE.AnimationAction | null = null;

  const width = container.clientWidth || 320;
  const height = container.clientHeight || 320;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(BG, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);

  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(3, 5, 4);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0x8290a8, 0.7));
  const rim = new THREE.DirectionalLight(BRAND, 0.5);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  const grid = new THREE.GridHelper(20, 20, GRID_MAJOR, GRID_MINOR);
  const gridMaterial = grid.material as THREE.Material;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.4;
  scene.add(grid);

  let model: THREE.Group | null = null;
  let mixer: THREE.AnimationMixer | null = null;
  let lastFrame = performance.now();
  let bounds: THREE.Box3 | null = null;

  const frame = () => {
    if (!bounds) return;
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    const { position, target } = cameraFor(bounds, w / h, camera.fov);
    camera.position.copy(position);
    camera.lookAt(target);
  };

  const onResize = () => {
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    frame();
    render();
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
      if (onScreen) loop();
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(container);

  const render = () => renderer.render(scene, camera);

  let rafId = 0;
  const loop = () => {
    cancelAnimationFrame(rafId);
    if (disposed) return;
    rafId = requestAnimationFrame(loop);
    const now = performance.now();
    const delta = (now - lastFrame) / 1000;
    lastFrame = now;
    if (!onScreen) return;
    if (mixer && !paused) mixer.update(delta);
    render();
  };

  loadCoachModel()
    .then(({ scene: source, animations }) => {
      if (disposed) return;

      const clip = THREE.AnimationClip.findByName(animations, clipName);
      if (!clip) throw new Error(`coach.glb has no clip named "${clipName}"`);

      model = cloneSkeleton(source) as THREE.Group;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      bounds = sweepClipBounds(model, mixer, clip);
      // Sit the grid under the movement rather than at the rig's origin.
      grid.position.y = bounds.min.y;

      action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.timeScale = speed;
      action.play();
      if (paused) action.paused = true;

      lastFrame = performance.now();
      frame();
      onReady?.();
      loop();
    })
    .catch((err) => {
      if (disposed) return;
      onError?.(err);
    });

  render();

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mixer?.stopAllAction();
      // The cached source model owns the geometries and materials shared by
      // every clone, so only the clone's own scene graph is detached here.
      if (model) scene.remove(model);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
    setPaused(next) {
      paused = next;
      if (action) action.paused = next;
    },
    setSpeed(next) {
      speed = next;
      if (action) action.timeScale = next;
    },
  };
}
