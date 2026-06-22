import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-panel": "var(--bg-panel)",
        "accent-blue": "var(--accent-blue)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-orange": "var(--accent-orange)",
        "accent-red": "var(--accent-red)",
        "accent-purple": "var(--accent-purple)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-display)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee-left": "marquee-left 24s linear infinite",
        "marquee-right": "marquee-right 28s linear infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(60,160,255,0.15)',
        'glow-purple': '0 0 30px rgba(180,100,255,0.15)',
        'glow-active': '0 0 15px rgba(100,180,255,0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
