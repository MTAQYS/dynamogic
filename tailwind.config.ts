import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        "bg-muted": "#F7F7F5",
        fg: "#0A0A0A",
        "fg-muted": "#525252",
        border: "#E5E5E5",
        "border-strong": "#0A0A0A",
        "invert-bg": "#0A0A0A",
        "invert-fg": "#FAFAFA",
        danger: "#B91C1C",
        success: "#166534",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgb(0 0 0 / 6%)",
      },
    },
  },
  plugins: [],
};

export default config;
