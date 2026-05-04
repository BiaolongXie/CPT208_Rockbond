/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rock: {
          ink: "#06170D",
          green: "#0D2818",
          moss: "#4C6B51",
          mint: "#CFEAC9",
          mist: "#E1E3DF",
          paper: "#F7F8F4",
          stone: "#8B968C",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(13, 40, 24, 0.14)",
        lift: "0 10px 30px rgba(13, 40, 24, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
