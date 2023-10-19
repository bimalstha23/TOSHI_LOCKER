/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        toshimain: '#0052FF',
      },
      borderRadius: {
        toshi: "23px"
      }

    },
  },
  plugins: [],
}