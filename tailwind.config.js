/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-unbounded)"],
      },
      colors: {
        primary: "var(--primary-colour)",
        secondary: "var(--secondary-colour)",
      },
      borderRadius: {
        DEFAULT: "0.15vmax",
        sm: "0.25vmax",
        md: "0.5vmax",
        lg: "0.75vmax",
        xl: "1vmax",
      },
    },
  },
  plugins: [],
};
