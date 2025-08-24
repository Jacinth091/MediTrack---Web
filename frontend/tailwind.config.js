/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],  // Default sans-serif
        lobster: ["Lobster", "cursive"],
        "dancing-script": ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
