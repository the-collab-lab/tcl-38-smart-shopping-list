module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Amatic: ['Amatic SC', 'cursive'],
      },
      backgroundImage: {
        chalkboard: "url('')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
