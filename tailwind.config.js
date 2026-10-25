/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mindful: {
          bg: '#FAF8F5',
          card: '#FFFFFF',
          purple: '#6B609E',
          'purple-light': '#8B80C3',
          'purple-subtle': '#E8E4F3',
          'purple-dark': '#4A4077',
          peach: '#FF9A8B',
          coral: '#FF7B6E',
          softBg: '#F3EFEA',
          textDark: '#2D2B3D',
          textMuted: '#6E6B80',
          accentYellow: '#FCD34D',
          accentGreen: '#6EE7B7',
          accentBlue: '#93C5FD'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(107, 96, 158, 0.08)',
        'card': '0 8px 24px -6px rgba(45, 43, 61, 0.06)',
        'floating': '0 20px 40px -15px rgba(107, 96, 158, 0.15)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.6)'
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem'
      }
    },
  },
  plugins: [],
}
