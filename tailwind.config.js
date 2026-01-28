/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 THIS enables .dark
  content: [
    "./**/*.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

