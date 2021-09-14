const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    enabled: process.env.NODE_ENV === 'production'
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
