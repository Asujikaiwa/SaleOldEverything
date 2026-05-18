import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Eco-Trust Palette
        brand: {
          // Natural Green — sustainability / circular economy
          green: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            300: '#6EE7B7',
            400: '#34D399',
            500: '#10B981',   // accent green
            600: '#059669',   // PRIMARY brand green
            700: '#047857',
            800: '#065F46',
            900: '#064E3B',
          },
          // Deep Trustworthy Blue — corporate reliability
          blue: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',   // ACCENT brand blue
            800: '#1E40AF',
            900: '#1E3A8A',   // deep ocean blue
            950: '#172554',
          },
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          subtle: '#F1F5F9',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          subtle: '#94A3B8',
        },
        success: '#059669',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 16px -2px rgb(15 23 42 / 0.06)',
        'card-hover': '0 4px 8px 0 rgb(0 0 0 / 0.06), 0 12px 32px -4px rgb(15 23 42 / 0.10)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
