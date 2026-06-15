import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0E2A23",
          text: "#F5F5F5",
          surface: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.08)",
          muted: "rgba(255,255,255,0.75)",
          focus: "rgba(255,255,255,0.25)",
          hover: "rgba(255,255,255,0.08)",
          primary: "#F5F5F5",
          secondary: "#C78B5E",
          secondaryHover: "#B8734C",
          accent: "#D29A6A",
          accentHover: "#B8734C"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
