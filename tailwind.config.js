module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Cedarville Cursive', 'cursive'],
        karla: ['Karla', 'sans-serif'],
      },
      colors: {
        customGray: '#1d1c21', // Your custom gray color
        customBlue: '#cae7eb', // Your custom blue color
        customGreen: '#0B353E',
        customVoilet: '#603D5C'
      },
    },
  },
  plugins: [],
};
