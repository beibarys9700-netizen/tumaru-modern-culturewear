export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        card: 'var(--color-card)',
        tur: 'var(--color-accent)',
        turDark: 'var(--color-accent-dark)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Golos Text', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Manrope', 'Golos Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
