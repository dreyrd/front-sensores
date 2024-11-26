/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azulLink: '#0095FF',
        vermelhoBotao: '#E81D14'
      }
    },
  },
  plugins: [],
}

