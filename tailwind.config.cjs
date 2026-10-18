/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#a0a0a0",
        tertiary: "#1a1a1a",
        "black-100": "#111111",
        "black-200": "#080808",
        "white-100": "#f5f5f5",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1a1a1a",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
