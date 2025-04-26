/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './screen/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#00bdff',
        secondary: '#00f7ff',
        background: '#101010',
        foreground: '#eeeeee',
      },
    },
  },
  plugins: [],
};
