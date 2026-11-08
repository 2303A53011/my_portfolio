/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        slate: {
          50: '#F5F6FA', 100: '#E8EAF0', 200: '#D3D7E0', 300: '#B3B9C6', 400: '#8E95A5',
          500: '#6B7283', 600: '#3A4050', 700: '#252A37', 800: '#161A24', 900: '#0C0F16', 950: '#05060A',
        },
        teal: { 300: '#9CFFE6', 400: '#4DFFD2', 500: '#1FE6B8', 600: '#12B793' },
        purple: { 500: '#4DFFD2' },
        ink: '#05060A',
        panel: '#0C0F16',
        line: '#1C2130',
        bone: '#F5F6FA',
        signal: '#4DFFD2',
        gold: '#C9CEDB',
        alert: '#FF5C7A',
        mute: '#7B8294',
      },
    },
  },
  plugins: [],
};
