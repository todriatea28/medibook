/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#0ea5e9',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
        }
      },
    },
  },
  plugins: [],
}