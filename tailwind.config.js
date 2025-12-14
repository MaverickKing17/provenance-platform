// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: Tells Tailwind where to find your classes
  content: [
    "./*.{js,ts,jsx,tsx,html}", // Scans App.tsx, index.tsx, index.html
    "./components/**/*.{js,ts,jsx,tsx}", // Scans your components folder (Footer.tsx, Hero.tsx, etc.)
  ],
  theme: {
    extend: {
      colors: {
        // Your custom colors from the design
        'primary-navy': '#1A2A44',
        'accent-gold': '#D4AF37',
      },
      fontFamily: {
        // Your custom fonts (assuming you link them in index.html or main CSS)
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
