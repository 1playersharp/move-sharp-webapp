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
        mint: {
          DEFAULT: "#2ecc94",
          400: "#4ddba8",
          500: "#2ecc94",
          600: "#22a878",
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
