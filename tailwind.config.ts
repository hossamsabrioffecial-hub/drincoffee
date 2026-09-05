import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a09",        // near-black base
        char: "#151412",       // charcoal panels
        char2: "#1d1b17",      // raised charcoal
        gold: "#c9a227",       // primary gold
        gold2: "#e8c766",      // bright gold (hover/highlight)
        goldline: "#3a331d",   // hairline gold-tinted border
        bone: "#f2ede0",       // primary text on dark
        stone: "#a39c8a",      // secondary/muted text
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        arabicsans: ["var(--font-arabic-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      backgroundImage: {
        "gold-fade": "linear-gradient(180deg, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0) 100%)",
        "radial-vignette": "radial-gradient(120% 120% at 50% 0%, rgba(232,199,102,0.08) 0%, rgba(10,10,9,0) 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
