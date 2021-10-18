const defaultTheme = require("tailwindcss/defaultTheme");
const fonts = defaultTheme.fontFamily.sans;
module.exports = {
  plugins: [require("@tailwindcss/ui")],
  purge: {
    mode: "all",
    content: ["./dist/**/*.html"],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fonts],
      },
      screens: {
        dm: { raw: "(prefers-color-scheme: dark)" },
      },
    },
  },
};
