import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F6F3",
        "bg-muted": "#F0EEE9",
        "bg-paper": "#FFFEFB",
        fg: "#1A1A1A",
        "fg-muted": "#6B6B66",
        border: "#E8E6E1",
        "border-strong": "#2A2A28",
        "invert-bg": "#2A2A28",
        "invert-fg": "#F7F6F3",
        danger: "#B91C1C",
        success: "#166534",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(42 42 40 / 5%)",
        paper: "0 8px 32px rgb(42 42 40 / 8%)",
        bay: "0 0 0 1px #2A2A28, 0 24px 64px rgb(42 42 40 / 10%)",
        billboard: "0 32px 80px -16px rgb(42 42 40 / 28%)",
      },
      letterSpacing: {
        display: "-0.045em",
        tightest: "-0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
