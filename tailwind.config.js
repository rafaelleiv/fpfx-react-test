/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#012030',
        secondary: '#003A47',
        accent: '#3b82f6',
        positive: '#0FC2C0',
        negative: '#FF3737',
        textPrimary: '#ffffff',
        textSecondary: '#A9A29C',
        textBalance: '#F6742A',
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        base: '14px',
        'h-panel': ['20px', '27.24px'],
      },
      textUnderlinePosition: {
        'from-font': 'from-font',
      },
      textDecorationSkipInk: {
        none: 'none',
      },
    },
  },
  plugins: [],
};
