/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './polygrip/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
