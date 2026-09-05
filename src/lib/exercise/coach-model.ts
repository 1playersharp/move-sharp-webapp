import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { COACH_MODEL_URL } from "./coach-clips";

export type LoadedCoach = {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
};

// One fetch + parse per page load, shared by every canvas on the screen —
// both the captured clips and the retargeted procedural pilots draw the same
// avatar, so they draw it from the same download.
let coachPromise: Promise<LoadedCoach> | null = null;

export function loadCoachModel(): Promise<LoadedCoach> {
  if (!coachPromise) {
    coachPromise = new Promise<LoadedCoach>((resolve, reject) => {
      new GLTFLoader().load(
        COACH_MODEL_URL,
        (gltf) => resolve({ scene: gltf.scene as THREE.Group, animations: gltf.animations }),
        undefined,
        (err) => {
          coachPromise = null; // let a later mount retry
          reject(err);
        },
      );
    });
  }
  return coachPromise;
}
