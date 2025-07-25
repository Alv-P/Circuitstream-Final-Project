import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#97C8EB",
        foreground: "#001011",
        accent: "#093A3E",
        primary: "#3AAFB9",
        secondary: "#64E9EE",
        // ...other colors...
      },
    },
  },
  plugins: [],
} satisfies Config;
