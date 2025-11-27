/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pet-blue': '#3B9AE1',
        'pet-navy': '#1B3A5F',
        'pet-orange': '#FFA366',
        'pet-light': '#E8F4FB',
        'pet-sky': '#87CEEB',
      },
      animation: {
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'scale-x': 'scaleX 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        scaleX: {
          '0%, 100%': { transform: 'scaleX(0.8)' },
          '50%': { transform: 'scaleX(1.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderRadius: {
        'pet': '1.5rem',
      },
      fontFamily: {
        'pet': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}