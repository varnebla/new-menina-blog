/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#f9f4ef',
        primary: '#020826',
        secondary: '#8c7851'
      }
    },
    fontFamily: {
      'dm-sans': ['DM Sans', 'sans-serif'],
      'dm-serif': ['DM Serif Display', 'serif']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
    // ...
  ]
};
