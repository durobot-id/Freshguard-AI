import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#72D94C",
          dark: "#205C36",
          pale: "#EAF8E3",
          bg: "#F7FAF5",
          surface: "#FFFFFF",
          text: "#1D2B21",
          muted: "#657268",
          border: "#E3EAE1",
          warning: "#D97706",
          danger: "#DC2626",
          warningBg: "#FEF3C7",
          dangerBg: "#FEE2E2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(29, 43, 33, 0.05), 0 1px 2px 0 rgba(29, 43, 33, 0.03)",
        card: "0 4px 12px 0 rgba(32, 92, 54, 0.06), 0 1px 3px 0 rgba(32, 92, 54, 0.04)",
        prominent: "0 10px 25px -5px rgba(32, 92, 54, 0.1), 0 8px 10px -6px rgba(32, 92, 54, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
