/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          bg: '#0A0F1D',
          card: '#12192E',
          accent: '#FF007A',
          cyan: '#00F0FF',
          yellow: '#FFDF00',
          orange: '#FF5E00',
          emerald: '#10B981',
          purple: '#8B5CF6',
          dark: '#070B14'
        }
      },
      backgroundImage: {
        'goa-gradient': 'linear-gradient(135deg, #0A0F1D 0%, #1A0B2E 50%, #0D223A 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF5E00 0%, #FF007A 50%, #7E22CE 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #00F0FF 0%, #3B82F6 50%, #8B5CF6 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFE259 0%, #FFA751 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 240, 255, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
