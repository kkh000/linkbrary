import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      mb: '375px',
      tb: '767px',
      pc: '1200px',
    },
    extend: {
      scale: {
        '130': '1.3',
      },
      colors: {
        primary: '#6D6AFE',
        red: '#FF5B56',
        black: '#111322',
        white: '#FFFFFF',
        gray: '#F5F5F5',
        gray10: '#E7EFFB',
        gray20: '#CCD5E3',
        gray60: '#9FA6B2',
        gray100: '#3E3E43',
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
    },
  },
  plugins: [],
};
export default config;
