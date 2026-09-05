import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0e14",
          900: "#0f141c",
          850: "#141a24",
          800: "#1a2130",
          700: "#232c3d",
          600: "#2e3849",
        },
        // Semantic roles. Each hue means exactly one thing, so a colour is
        // never asked to carry two messages at once.
        //
        // brand       — wordmark, primary actions, active nav, links.
        //               Never completion, success, progress or achievement.
        // completion  — a thing is finished: ticked items, progress fill,
        //               "programme complete".
        // achievement — badges and PBs earned.
        // caution     — destructive and gated actions, warnings.
        // muted       — neutral text (below).
        brand: {
          DEFAULT: "#38bdf8",
          400: "#7dd3fc",
          500: "#38bdf8",
          600: "#0ea5e9",
        },
        completion: {
          DEFAULT: "#2ecc94",
          400: "#4ddba8",
          500: "#2ecc94",
          600: "#22a878",
        },
        achievement: {
          DEFAULT: "#f5b942",
          400: "#ffd166",
          500: "#f5b942",
          600: "#d99a2b",
        },
        caution: {
          100: "#fee2e2",
          200: "#fecaca",
          DEFAULT: "#fca5a5",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
        },
        // One hue per training quality, so the library is scannable without
        // reading every label. These are always carried as a dot or edge-bar
        // — never a fill or text colour — so they read as a category rather
        // than a status, and cannot be confused with the semantic hues above.
        quality: {
          speed: "#f97316",
          power: "#a78bfa",
          strength: "#f472b6",
          agility: "#2dd4bf",
          endurance: "#a3e635",
          robustness: "#94a3b8",
        },
        muted: {
          DEFAULT: "#8a94a6",
          strong: "#b6bfd0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "0.04em",
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
