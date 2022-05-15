const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        AeonikL: ["AeonikL"],
        Aeonik: ["Aeonik"],
        AeonikM: ["AeonikM"],
        AeonikB: ["AeonikB"],
      },
      borderColor: theme => ({
        "signature-color": "#7144FF",
        "placeholder-color": "#e0e0e0",
      }),
      backgroundColor: theme => ({
        "signature-color": "#7144FF",
        "black-rgba": "rgba(0, 0, 0, 0.54)",
        "placeholder-color": "#e0e0e0",
      }),
      textColor: theme => ({
        "signature-color": "#7144FF",
        "placeholder-color": "#e0e0e0",
      }),
      animation: {
        slideUp: "slideUp 0.25s ease-out forwards",
        slideDown: "slideDown 0.25s ease-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(200px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        slideDown: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(200px)",
          },
        },
      },
    },
  },
  plugins: [],
}
