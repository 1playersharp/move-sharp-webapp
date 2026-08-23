"use client";

import { useEffect, useRef } from "react";
import type { MotionSpec } from "@/lib/exercise/motion-spec";

type Props = {
  spec: MotionSpec;
  className?: string;
};

export function ExerciseCanvas({ spec, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    let disposed = false;
    let disposeFn: (() => void) | null = null;

    // Dynamic import — keeps three.js out of the shared bundle so screens
    // without a canvas don't pay for it.
    import("@/lib/exercise/scene").then(({ mountExerciseScene }) => {
      if (disposed) return;
      const handle = mountExerciseScene(container, spec);
      disposeFn = handle.dispose;
    });

    return () => {
      disposed = true;
      disposeFn?.();
    };
  }, [spec]);

  return (
    <div
      ref={ref}
      className={className ?? "aspect-square w-full overflow-hidden rounded-card"}
      aria-label={`3D animation of ${spec.name}`}
      role="img"
    />
  );
}
