import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        board: "var(--c-board)",
        onboard: "var(--c-on-board)",
        accent: "var(--c-accent)",
        onaccent: "var(--c-on-accent)",
        paper: "var(--c-paper)",
        head: "var(--c-head)",
      },
    },
  },
  plugins: [],
} satisfies Config;
