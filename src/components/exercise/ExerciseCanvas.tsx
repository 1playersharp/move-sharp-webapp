"use client";

import { ExerciseViewer } from "./ExerciseViewer";
import type { MotionSpec } from "@/lib/exercise/motion-spec";

type Props = {
  spec: MotionSpec;
  className?: string;
};

// A procedurally animated pilot — the fallback for exercises the 3D Coach
// has no captured clip for.
export function ExerciseCanvas({ spec, className }: Props) {
  return (
    <ExerciseViewer
      sceneKey={`spec:${spec.slug}`}
      label={spec.name}
      className={className}
      loadScene={async () => {
        const { mountExerciseScene } = await import("@/lib/exercise/scene");
        // The pilots are retargeted onto the same avatar as the captured
        // clips, so they wait on the same model download.
        return (container, { onReady }) => mountExerciseScene(container, spec, { onReady });
      }}
    />
  );
}
