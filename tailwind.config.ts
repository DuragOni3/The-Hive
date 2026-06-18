import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: "#FFC107",
        amber: "#FFB300",
        gold: "#FFD54F",
        ink: "#0B0B0B",
        charcoal: "#161616",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-y": {
          "0%": { transform: "perspective(150px) rotateY(0deg)" },
          "100%": { transform: "perspective(150px) rotateY(360deg)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        "spin-y": "spin-y 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
