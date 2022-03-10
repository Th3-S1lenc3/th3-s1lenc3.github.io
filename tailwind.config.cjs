const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,svelte,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.blue['800'],
        secondary: '#444',
        success: colors.green['600'],
        info: colors.cyan['600'],
        warning: colors.amber['500'],
        danger: colors.red['600'],
        light: '#7b8a8b',
        dark: '#303030',
        navlink: '#fff9',
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5'
        }
      }
    }
  },
  plugins: []
}
