module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Amatic: ['Amatic SC', 'cursive'],
      },
      backgroundImage: {
        chalkboard: "url('./assets/chalkboard.jpg')",
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
      fontSize: {
        xs: '1.25rem',
        sm: '1.7rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
