/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      borderRadius: {
        'pet': '1.5rem',
      }
    },
  },
  plugins: [],
}