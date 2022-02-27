module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Amatic: ['Amatic SC', 'cursive'],
      },
      backgroundImage: {
        chalkboard:
          // "url('/Users/kristenmonnik/Documents/Dev_Stuff/Projects/collab-lab/smart-shopping-list/tcl-38-smart-shopping-list/src/assets/chalkboard.jpg')",
          "url('./assets/chalkboard.jpg')",
      },
      boxShadow: {
        '3xl': '0px 0px 4px 4px rgba(255, 255, 255, 0.3)',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        1: '1.5px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
