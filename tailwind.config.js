/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      Img1: "url('./assets/2.avif')",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
