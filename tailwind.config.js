/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      accent: '#EC5757',
      primary: '#7C5DFA',
      secondary: '#464664',
      'secondary-dark': '#1E2139',
      dark: '#0C0E16',
      light: '#f5f5f5',
      white: '#ffffff',
    },
    extend: {},
  },
  plugins: [],
};
