// Both demo scenes — the captured 3D Coach clips and the procedural pilots —
// expose the same handle, so one viewer component can drive either.
export type PlaybackHandle = {
  dispose: () => void;
  setPaused: (paused: boolean) => void;
  setSpeed: (speed: number) => void;
};

export const PLAYBACK_SPEEDS = [
  { value: 1, label: "1×" },
  { value: 0.5, label: "0.5×" },
  { value: 0.25, label: "0.25×" },
] as const;
