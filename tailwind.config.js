module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem',
      },
      width: {
        '184': '46rem',
        '172': '43rem',
        '224': '56rem',
        '140': '35rem',
        '132': '33rem',
      },
      colors: {
        'leetcodeGray1': '#313131',
        'leetcodeGray2': '#404040',
        'leetcodeGray3': '#505050',
        'sidebar': '#202020'
      }
    }
  },
  plugins: [
        require('flowbite/plugin')
    ],
}

