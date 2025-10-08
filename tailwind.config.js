/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9AA2',
        secondary: '#FFB7B2',
        accent: '#FFDAC1',
        background: '#E2F0CB',
        surface: '#B5EAD7',
        text: '#2D3748',
        'text-light': '#718096',
      },
      borderRadius: {
        'card': '8px',
      },
    },
  },
  plugins: [],
}