import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF7",
        "bg-muted": "#F3F2EC",
        "bg-paper": "#FFFEF9",
        fg: "#111111",
        "fg-muted": "#5C5C57",
        border: "#E6E4DC",
        "border-strong": "#111111",
        "invert-bg": "#141413",
        "invert-fg": "#F5F4EF",
        danger: "#B91C1C",
        success: "#166534",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "5px",
        md: "6px",
        lg: "6px",
        xl: "6px",
        "2xl": "6px",
        full: "9999px",
      },
      boxShadow: {
        soft: "none",
        paper: "0 1px 0 rgb(17 17 17 / 4%)",
      },
    },
  },
  plugins: [],
};

export default config;
