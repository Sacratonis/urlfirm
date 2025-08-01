// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './lib/**/*.{js,jsx,ts,tsx,mdx}',
    './styles/**/*.css',
    './app/**/*.{js,jsx,ts,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.hover-scale': {
          '@apply transition-transform duration-200 hover:scale-105': {}
        }
      });
    }
  ],
  safelist: [
    'bg-red-100',
    'bg-green-100',
    'text-red-500',
    'text-green-500',
    'border-red-200'
  ],
  darkMode: 'class'
};