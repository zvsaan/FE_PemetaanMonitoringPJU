/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/extensions */
/** @type {import('tailwindcss').Config} */

import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';

// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', ..._fontFamily.sans],
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '4-5xl': '2.625rem',
      '5xl': '3rem',
      '5-5xl': '3.875rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      colors: {
        'light-theme-purple': '#E3D3FD',
        'theme-purple': '#6610f2',
        'dark-theme-purple': '#520dc2',
        'theme-blue': '#152C5B',
      },
      margin: {
        '-112': '-28rem',
        '-120': '-30rem',
        '-128': '-32rem',
        '-144': '-36rem',
      },
      animation: {
        'bounce-x': 'bouncex 1s infinite',
        'brutal-move': 'brutalMove 4s infinite ease-in-out',
      },
      keyframes: {
        bouncex: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        brutalMove: {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
      '10%': { transform: 'translate(80px, -150px)', opacity: '0.9' },
      '20%': { transform: 'translate(-100px, 120px)', opacity: '0.8' },
      '30%': { transform: 'translate(120px, 60px)', opacity: '0.7' },
      '40%': { transform: 'translate(-140px, -90px)', opacity: '0.6' },
      '50%': { transform: 'translate(160px, 140px)', opacity: '0.5' },
      '60%': { transform: 'translate(-120px, 160px)', opacity: '0.6' },
      '70%': { transform: 'translate(100px, -130px)', opacity: '0.7' },
      '80%': { transform: 'translate(-80px, 100px)', opacity: '0.8' },
      '90%': { transform: 'translate(50px, -80px)', opacity: '0.9' },
      '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
      },
      spacing: {
        71: '17.75rem',
        95: '23.5rem',
        192: '48rem',
        192.5: '49.5rem',
        193: '51rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
