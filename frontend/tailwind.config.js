/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Default sans-serif font
        lobster: ["Lobster", "cursive"], // Custom Lobster font
      },
    },
  },
  plugins: [],
};