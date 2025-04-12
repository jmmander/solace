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
        primary: {
          DEFAULT: '#275b4e',
          light: '#347866',
          dark: '#1a4037',
        },
        secondary: {
          DEFAULT: '#e6c86e', // Yellow/gold
          light: '#f4dfa0',
          dark: '#d4b44e',
        },
        accent: {
          DEFAULT: '#d66853', // Terracotta
          light: '#e38c7c',
          dark: '#b84e39',
        },
        blue: {
          DEFAULT: '#4a6fa5', // Blue accent
          light: '#6b8bbd',
          dark: '#345689',
        },
        background: {
          DEFAULT: '#f7f7f7',
          dark: '#e0e0e0',
        },
        white: '#ffffff',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
