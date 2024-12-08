/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: 'rgb(20, 20, 20)',
          'bg-light': 'rgb(30, 30, 30)',
          'bg-dark': 'rgb(15, 15, 15)',
          accent: 'rgb(0, 120, 90)',
          'accent-light': 'rgb(0, 140, 105)',
          text: 'rgb(245, 240, 225)',
          gold: 'rgb(218, 165, 32)',
          'gold-light': 'rgb(238, 185, 52)',
          overlay: 'rgba(0, 0, 0, 0.7)'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'luxury': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'luxury-hover': '0 8px 30px rgba(0, 0, 0, 0.5)',
        'luxury-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: [],
};