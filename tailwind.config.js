/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1A2A44',
        'accent-gold': '#D4AF37',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
