/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dm-dark': '#0a0a23',
        'dm-deep': '#1a1a40',
        'dm-blue': '#3b82f6',
        'dm-purple': '#8b5cf6',
        'dm-glass': 'rgba(255,255,255,0.08)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
