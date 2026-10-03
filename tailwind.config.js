/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './polygrip/index.html', './404.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
