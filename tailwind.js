module.exports = {
  purge: {
    enabled: true,
    content: [
      './views/**/*.hbs',
    ],
  },
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    container: {
      center: true,
      padding: '1rem'
    },
  },
  variants: {},
  plugins: [],
}
