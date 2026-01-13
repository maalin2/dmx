/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}