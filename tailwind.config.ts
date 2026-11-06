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
        board: { DEFAULT: "#24473a", dark: "#1a3329" },
        pencil: "#f5c542",
        paper: "#fffdf5",
      },
    },
  },
  plugins: [],
} satisfies Config;
