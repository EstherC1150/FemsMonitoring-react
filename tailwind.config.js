/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        'hyundai-navy': 'var(--hyundai-navy)',
        'hyundai-blue': 'var(--hyundai-blue)',
        'accent-blue': 'var(--accent-blue)',
        'accent-green': 'var(--accent-green)',
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'text-main': 'var(--text-main)',
        'text-secondary': 'var(--text-secondary)',
        'border-color': 'var(--border-color)',
      }
    },
  },
  plugins: [],
}