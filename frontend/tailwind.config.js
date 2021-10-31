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
      colors: {
        'cornflower-blue': {
          '50': '#f8fbff', 
          '100': '#f0f6ff', 
          '200': '#dae9ff', 
          '300': '#c4dbff', 
          '400': '#97c0ff', 
          '500': '#6ba5ff', 
          '600': '#6095e6', 
          '700': '#507cbf', 
          '800': '#406399', 
          '900': '#34517d'
      },
        'custom-white': '#FAFAFA',
      },
      width: {
        '872': '872px',
        '365': '365px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
