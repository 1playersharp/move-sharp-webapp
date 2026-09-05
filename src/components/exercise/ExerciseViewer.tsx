"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PLAYBACK_SPEEDS, type PlaybackHandle } from "@/lib/exercise/playback";

export type SceneMount = (container: HTMLElement, hooks: {
  onReady: () => void;
  onError: (err: unknown) => void;
}) => PlaybackHandle;

type Props = {
  /** Changing this tears the scene down and mounts a fresh one. */
  sceneKey: string;
  /** Deferred so three.js stays out of the shared bundle. */
  loadScene: () => Promise<SceneMount>;
  label: string;
  className?: string;
};

// The chrome shared by every 3D demo — canvas, loading/error state, and the
// playback controls. Both the captured 3D Coach clips and the procedural
// pilots mount through here, so a player gets the same controls everywhere.
export function ExerciseViewer({ sceneKey, loadScene, label, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<PlaybackHandle | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Held in a ref so a new closure each render doesn't remount the scene —
  // sceneKey is what decides that.
  const loadSceneRef = useRef(loadScene);
  loadSceneRef.current = loadScene;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    setStatus("loading");

    loadSceneRef
      .current()
      .then((mount) => {
        if (disposed) return;
        handleRef.current = mount(container, {
          onReady: () => setStatus("ready"),
          onError: () => setStatus("error"),
        });
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      });

    return () => {
      disposed = true;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, [sceneKey]);

  // Re-applied on status change so a freshly mounted scene picks up controls
  // the player already set.
  useEffect(() => {
    handleRef.current?.setPaused(paused);
    handleRef.current?.setSpeed(speed);
  }, [paused, speed, status]);

  return (
    <div className={cn("w-full max-w-[30rem] overflow-hidden rounded-card bg-ink-900", className)}>
      <div className="relative">
        <div
          ref={containerRef}
          className="aspect-square w-full"
          role="img"
          aria-label={`3D animation of ${label}`}
        />
        {status !== "ready" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-900 text-center">
            <p className="max-w-[75%] text-xs text-muted">
              {status === "loading" ? (
                <span className="font-display uppercase tracking-display">Loading…</span>
              ) : (
                "This demo couldn't load. Check your connection and reload."
              )}
            </p>
          </div>
        ) : null}
      </div>

      {status === "ready" ? (
        <div className="flex items-center justify-between gap-2 border-t border-white/5 px-3 py-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? `Play ${label}` : `Pause ${label}`}
            className="inline-flex h-8 items-center rounded-full bg-ink-800 px-3 text-[0.7rem] font-display uppercase tracking-display text-white transition-colors hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {paused ? "▶ Play" : "❚❚ Pause"}
          </button>
          <div className="flex items-center gap-1" role="group" aria-label="Playback speed">
            {PLAYBACK_SPEEDS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSpeed(s.value)}
                aria-pressed={speed === s.value}
                className={cn(
                  "h-8 rounded-full px-3 text-[0.7rem] font-display uppercase tracking-display transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  speed === s.value
                    ? "bg-brand text-ink-950"
                    : "bg-ink-800 text-muted hover:bg-ink-700 hover:text-white",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
