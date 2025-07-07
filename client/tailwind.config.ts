import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        spiritual: {
          gold: '#D4AF37',
          purple: '#6B46C1',
          heavenly: '#87CEEB',
          peace: '#E6F3FF',
          grace: '#F8FAFC',
        },
        christian: {
          cross: '#8B4513',
          light: '#FFF8DC',
          dove: '#F5F5F5',
          love: '#DC143C',
          hope: '#32CD32',
          faith: '#4169E1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        scripture: ['Times New Roman', 'serif'],
      },
      boxShadow: {
        'holy': '0 4px 20px rgba(107, 70, 193, 0.1)',
        'peaceful': '0 2px 10px rgba(135, 206, 235, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gentle': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
export default config