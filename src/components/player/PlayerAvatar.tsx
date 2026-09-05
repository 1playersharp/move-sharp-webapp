import { cn } from "@/lib/cn";

// Preset illustrated avatars. No photo upload, by product rule — the
// player picks one of a fixed set and we store the key in
// Player.avatarId (the column already existed; nothing rendered it
// until now).
//
// Each preset is a flat geometric mark in the existing brand/ink palette
// — no new colours, no image assets to ship. Unknown or missing
// avatarId falls back to the player's initial, so the card never
// renders empty.

export const AVATAR_PRESETS = [
  "bolt",
  "shield",
  "flame",
  "arrow",
  "ring",
  "chevron",
] as const;

export type AvatarPreset = (typeof AVATAR_PRESETS)[number];

function isPreset(v: string | null): v is AvatarPreset {
  return v !== null && (AVATAR_PRESETS as readonly string[]).includes(v);
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const MARKS: Record<AvatarPreset, React.ReactNode> = {
  bolt: <path d="M13 3 6 13h5l-1 8 7-10h-5l1-8Z" {...stroke} />,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" {...stroke} />,
  flame: <path d="M12 3s5 5.5 5 10a5 5 0 1 1-10 0c0-4.5 5-10 5-10Z" {...stroke} />,
  arrow: (
    <>
      <path d="M5 19 19 5" {...stroke} />
      <path d="M11 5h8v8" {...stroke} />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="12" r="7" {...stroke} />
      <circle cx="12" cy="12" r="2.5" {...stroke} />
    </>
  ),
  chevron: (
    <>
      <path d="m6 13 6-6 6 6" {...stroke} />
      <path d="m6 18 6-6 6 6" {...stroke} />
    </>
  ),
};

type Props = {
  avatarId: string | null;
  // Used for the fallback initial and the accessible name.
  firstName: string;
  // Rendered size in px. 52 on the full card, 34 on compact.
  size: number;
  className?: string;
};

export function PlayerAvatar({ avatarId, firstName, size, className }: Props) {
  const preset = isPreset(avatarId) ? avatarId : null;
  const initial = firstName.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      // Decorative: the player's name is rendered as text right beside
      // this in every variant, so announcing it again is noise.
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        "border border-brand/30 bg-brand/10 text-brand",
        className,
      )}
    >
      {preset ? (
        <svg
          viewBox="0 0 24 24"
          width={Math.round(size * 0.55)}
          height={Math.round(size * 0.55)}
        >
          {MARKS[preset]}
        </svg>
      ) : (
        <span
          className="font-display uppercase tracking-display leading-none"
          style={{ fontSize: Math.round(size * 0.42) }}
        >
          {initial}
        </span>
      )}
    </span>
  );
}
