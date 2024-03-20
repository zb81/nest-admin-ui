/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  corePlugins: {
    preflight: false,
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color)',
        'dark-bg': '#151515',
        'deep-gray': '#666',
      },
    },
  },
  plugins: [],
}
