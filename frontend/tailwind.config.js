/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'bg-sidebar': '#F7F8FA',
        'border-color': '#E6E8EB',
        'chip-bg': '#F2F4F7',
        'flame-green': '#16A34A',
      },
    },
  },
  plugins: [],
}
