import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOrange: "#e89451",
        darkOrange: "#c8560c",
        lightText: "#eaecee",
        accent: "#120101",
        accentWhite: "#fbfbf5",
        lightRead: "#b78cc6",
        lightGreen: "#54b57d",
        bgLight: "#f4f6f7",
      },
    },
  },
  plugins: [],
} satisfies Config;
