/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: ["16px", "100px"],
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      default: ["16px", "100px"],
    },
    extend: {
      colors: {
        pgreen: "#B9DA3B",
        sgreen: "#D6FC44",
        bgblack: "#151515",
        pblack: "#232323",
        sblack: "#2C2C2C",
        pwhite: "#FAFAFA"
      },
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
};
