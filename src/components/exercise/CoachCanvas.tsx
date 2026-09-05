"use client";

import { ExerciseViewer } from "./ExerciseViewer";
import type { CoachClip } from "@/lib/exercise/coach-clips";

type Props = {
  clipName: CoachClip;
  label: string;
  className?: string;
};

// A captured 3D Coach clip, played off the shared coach.glb rig.
export function CoachCanvas({ clipName, label, className }: Props) {
  return (
    <ExerciseViewer
      sceneKey={`coach:${clipName}`}
      label={label}
      className={className}
      loadScene={async () => {
        const { mountCoachScene } = await import("@/lib/exercise/coach-scene");
        return (container, hooks) => mountCoachScene(container, { clipName, ...hooks });
      }}
    />
  );
}
