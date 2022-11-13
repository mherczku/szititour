/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'default': '#2F2F2F',
        'm-green': '#20c428',
        'm-blue': '#218AEB',
        'kon-blue': '#25AAD3',
        'kon-orange': '#EB5221',
        'smoke': '#F5F5F5',
      },
      screens: {
        'mobile': {'max': '600px'},
        'tablet': {'max': '1050px', 'min': '601px'},
      },
      borderWidth: {
        '1': '1px'
      },
    },
  },
  plugins: [],
}
