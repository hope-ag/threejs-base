const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans]
      }
    },
    container: {
      center: true
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      primary: {
        DEFAULT: colors.purple[500],
        ...colors.purple
      },
      success: colors.green,
      warning: colors.amber,
      danger: colors.red,
      info: colors.sky
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
         'html': { fontSize: "14px" },
       })
     }
  ],
}
