/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        surface: {
          dark: '#0B1120',
          'dark-card': '#111827',
          'dark-elevated': '#1E293B',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(99, 102, 241, 0.3)',
        'glow-md': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 40px -5px rgba(99, 102, 241, 0.5)',
        'card':    '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%':      { transform: 'translateY(10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px -3px rgba(99, 102, 241, 0.2)' },
          '50%':      { boxShadow: '0 0 30px -3px rgba(99, 102, 241, 0.5)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
