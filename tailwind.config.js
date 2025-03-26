/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./blog/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to prevent conflicts with Docusaurus
  },
  // Important to ensure Tailwind's styles have higher specificity than Docusaurus
  important: true, 
}; 