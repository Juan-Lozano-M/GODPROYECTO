/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        '10xl': '10rem', // O el tamaño que desees
        '11xl': '12rem', // Lo puedes ajustar a tu necesidad
        '12xl': '14rem',
      },
    },
  },
  plugins: [],
}
