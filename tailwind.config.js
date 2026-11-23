/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calcite: {
          light: '#DDDCDB',     // Light Mineral Gray from palette
          orange: '#FD7B41',    // Vibrant Calcite Orange from palette
          peach: '#EDBF9B',     // Sandstone / Warm Peach from palette
          charcoal: '#3C4044',  // Deep Charcoal Slate from palette
          dark: '#1B1D1F',      // Ultra deep charcoal base
          surface: '#26292D',   // Dark card surface
          elevated: '#2F3338',  // Elevated panel surface
          border: 'rgba(221, 220, 219, 0.12)',
        }
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -4px rgba(253, 123, 65, 0.45)',
        'glow-peach': '0 0 20px -3px rgba(237, 191, 155, 0.35)',
        'glow-dark': '0 10px 30px -10px rgba(27, 29, 31, 0.8)',
      }
    },
  },
  plugins: [],
}
