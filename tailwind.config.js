/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        azulLink: '#0095FF',
        vermelhoBotao: '#E81D14'
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.itens-menu': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.75rem',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '280ms',
          cursor: 'pointer',
        },
        '.itens-menu-hover': {
          '&:hover': {
            backgroundColor: '#d4d4d4',
          },
        }
      });
    },
  ],
}

