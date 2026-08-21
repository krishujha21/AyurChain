/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDeep: '#0D1117',
        surface: '#161B22',
        borderDark: '#30363D',
        primaryGreen: '#3FB950',
        accentGold: '#F0A500',
        textPrimary: '#E6EDF3',
        textMuted: '#8B949E',
        errorRed: '#F85149',
        verifiedBlue: '#58A6FF',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
