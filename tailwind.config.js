/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        // --- New Glass/Cyber Keyframes ---
        scan: {
          '0%': { transform: 'translateY(-120px)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(120px)', opacity: '0' },
        },
        progress: {
          '0%': { width: '0%', marginLeft: '0%' },
          '50%': { width: '100%', marginLeft: '0%' },
          '100%': { width: '0%', marginLeft: '100%' },
        },
      },
    },
  },
  plugins: [],
};

