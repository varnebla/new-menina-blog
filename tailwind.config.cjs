/** @type {import('tailwindcss').Config} */
const GOLD = {
  200: '#C9A66B',
  400: '#aa8a50',
  700: '#8C5E00',
  900: '#664c14'
};
const PEARL = {
  100: '#F5F0E4',
  200: '#ebe6da',
  400: '#c2beb2',
  700: '#5c5c5c',
  900: '#333333'
};

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: PEARL[100],
        primary: GOLD[700],
        secondary: '#8c7851',
        gold: {
          200: GOLD[200],
          400: GOLD[400],
          700: GOLD[700],
          900: GOLD[900]
        },
        pearl: {
          100: PEARL[100],
          200: PEARL[200],
          400: PEARL[400],
          700: PEARL[700],
          900: PEARL[900]
        }
      },
      typography: ({ theme }) => ({
        pearl: {
          css: {
            '--tw-prose-body': theme('colors.pearl[900]'),
            '--tw-prose-headings': theme('colors.pearl[900]'),
            '--tw-prose-lead': theme('colors.pearl[700]'),
            '--tw-prose-links': theme('colors.pearl[900]'),
            '--tw-prose-bold': theme('colors.pearl[900]'),
            '--tw-prose-counters': theme('colors.pearl[700]'),
            '--tw-prose-bullets': theme('colors.pearl[400]'),
            '--tw-prose-hr': theme('colors.pearl[400]'),
            '--tw-prose-quotes': theme('colors.pearl[900]'),
            '--tw-prose-quote-borders': theme('colors.pearl[400]'),
            '--tw-prose-captions': theme('colors.pearl[700]'),
            '--tw-prose-code': theme('colors.pearl[900]'),
            '--tw-prose-pre-code': theme('colors.pearl[200]'),
            '--tw-prose-pre-bg': theme('colors.pearl[900]'),
            '--tw-prose-th-borders': theme('colors.pearl[400]'),
            '--tw-prose-td-borders': theme('colors.pearl[200]'),
            '--tw-prose-invert-body': theme('colors.pearl[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.pearl[400]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.pearl[400]'),
            '--tw-prose-invert-bullets': theme('colors.pearl[700]'),
            '--tw-prose-invert-hr': theme('colors.pearl[700]'),
            '--tw-prose-invert-quotes': theme('colors.pearl[200]'),
            '--tw-prose-invert-quote-borders': theme('colors.pearl[700]'),
            '--tw-prose-invert-captions': theme('colors.pearl[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.pearl[400]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.pearl[700]'),
            '--tw-prose-invert-td-borders': theme('colors.pearl[700]')
          }
        }
      })
    },
    fontFamily: {
      'dm-sans': ['Geist Sans', 'sans-serif'],
      serif: ['Lora Variable', 'serif']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
    // ...
  ]
};
