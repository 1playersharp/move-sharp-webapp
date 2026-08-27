import Link from "next/link";
import Image from "next/image";
import { WordMark } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import heroImage from "@/images/gabin-vallet-J154nEkpzlQ-unsplash.jpg";

// Feature strip — 4 short pills that peek at what's inside so the
// reader learns what the app actually does before they sign up.
const FEATURES: Array<{ label: string; icon: React.ReactNode }> = [
  { label: "Programmes", icon: <IconProgrammes /> },
  { label: "PBs", icon: <IconPB /> },
  { label: "Fuel", icon: <IconFuel /> },
  { label: "3D coach", icon: <IconCoach /> },
];

export function Landing() {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col overflow-hidden px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-8">
      {/* Layered atmosphere behind the hero: full-bleed training
          photograph → dark gradient wash for text contrast → mint
          radial glow on top for brand warmth. All pointer-events-none
          and aria-hidden so they never intercept input or read to AT. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover object-center opacity-30"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/85 to-ink-950" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-[420px]
                   bg-[radial-gradient(circle_at_50%_30%,rgba(74,222,168,0.22),transparent_60%)]"
      />

      <div className="ms-fade-up relative mb-10" style={{ animationDelay: "0ms" }}>
        <WordMark className="text-3xl" />
      </div>

      <div className="relative flex-1 space-y-6">
        <h1 className="font-display uppercase tracking-display text-4xl leading-[1.05] text-white">
          <span className="ms-fade-up block" style={{ animationDelay: "120ms" }}>
            Faster. Stronger.
          </span>
          <span className="ms-fade-up block" style={{ animationDelay: "260ms" }}>
            Harder to move.
          </span>
        </h1>
        <p
          className="ms-fade-up text-base text-muted"
          style={{ animationDelay: "460ms" }}
        >
          Athletic training built for the athlete you want to be. Speed, power,
          robustness — at home with a band, or in the gym.
        </p>

        {/* "What's inside" pills — one glance, four feature areas. */}
        <ul
          className="ms-fade-up grid grid-cols-2 gap-2"
          style={{ animationDelay: "600ms" }}
        >
          {FEATURES.map((f) => (
            <li
              key={f.label}
              className="flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-3 py-2"
            >
              <span className="text-mint-400">{f.icon}</span>
              <span className="font-display uppercase tracking-display text-[0.65rem] text-white">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="ms-fade-up relative mt-10 space-y-3"
        style={{ animationDelay: "760ms" }}
      >
        <Link href="/sign-up" className="block">
          <Button size="lg" className="w-full">Create account</Button>
        </Link>
        <p className="text-center text-xs text-muted">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-mint-400 hover:text-mint">
            Sign in
          </Link>
        </p>
        <p className="pt-2 text-center text-[0.7rem] text-muted/70">
          Private by default. Coaches only see what you share.
        </p>
      </div>
    </div>
  );
}

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: 14,
  height: 14,
  "aria-hidden": true,
};

function IconProgrammes() {
  return (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M4 6h12" />
      <path d="M4 12h8" />
      <path d="M4 18h10" />
      <path d="M18 6l3 3-3 3" />
    </svg>
  );
}
function IconPB() {
  return (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 6h2a2 2 0 0 1 0 4h-2" />
      <path d="M7 6H5a2 2 0 0 0 0 4h2" />
    </svg>
  );
}
function IconFuel() {
  return (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M12 3s5 5.5 5 10a5 5 0 1 1-10 0c0-4.5 5-10 5-10Z" />
    </svg>
  );
}
function IconCoach() {
  return (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <circle cx="12" cy="7" r="2.5" />
      <path d="M8 21v-4l-2-3 3-4h6l3 4-2 3v4" />
    </svg>
  );
}
