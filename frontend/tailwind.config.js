/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#D9D9D9',
          200: '#A3A59F',
          300: '#B4926E',
          400: '#EA9C74',
        },
      },
    },
  },
  plugins: [],
};