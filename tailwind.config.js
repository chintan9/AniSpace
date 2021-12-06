module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-lighten": "#2a2a2a",
        "dark-normal": "#222222",
        "dark-darken": "#1a1a1a",
        orange: "#FF4D00",
        "blue-sky": "#007AFF",
      },
      spacing: {
        "one-twenty": "5%",
        "two-percent": "2%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
