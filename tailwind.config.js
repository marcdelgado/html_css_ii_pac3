module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1260px',
      },
      grayscale: {
        0: '0%',
        50: '50%',
      },
    },
    fontFamily: {
      antiqua: ['Modern Antiqua', 'sans-serif'],
      palatino: ['Palatino LT', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      grayscale: ['hover', 'focus'],
      filter: ['hover', 'focus'],
      transform: ['hover', 'focus'],
    },
  },
  plugins: [],
}
