
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        'surface-highlight': '#262626',
        primary: '#f59e0b', // Amber 500
        'primary-hover': '#d97706', // Amber 600
        secondary: '#a3a3a3', // Neutral 400
        error: '#ef4444',
        success: '#10b981',
      },
      fontFamily: {
        serif: ['"Crimson Text"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
