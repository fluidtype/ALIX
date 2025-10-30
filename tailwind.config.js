/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#0B0B0C",
        graphite: "#161617",
        steel: "#2B2B2E",
        neon: "#ADFF00",
        neonAlt: "#C6FF00",
        grey400: "#A1A1A3",
      },
      fontFamily: {
        sans: ["Inter Tight", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        lime: "0 0 30px rgba(173, 255, 0, 0.25)",
      },
      backgroundImage: {
        "lime-gradient": "linear-gradient(90deg, #ADFF00, #00FFA3)",
      },
    },
  },
  plugins: [],
};
