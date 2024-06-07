/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'w-[400px]',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#9EBDFF",
          medium: "#4D84FF",
          dark: "#0072FF",
        },
        secondary: {
          yellow: "#FF9900",
          green: "#33CC00",
          red: "#FF0033",
        },
        offWhite: {
          light: "#FDFDFD",
          dark: "#EDF0F5",
        },
        offBlack: "#262626"
      },
      screens: {
        'xxxxs': '350px',
        'xxxs': '420px',
        'xxs': '480px',
        'xs': '590px',
        'ml': '904px',
        '1.5xl': '1400px',
      },
      fontSize: {
        "title": "1.8rem",
        "subtitle": "1.4rem",
        "btn": "1.2rem",
        "body": "1rem",
        "xs": "0.8rem",
      },
      height: {
        'calc-100vh-71': 'calc(100vh - 71.2px)',
        'calc-100vh-176': 'calc(100vh - 176.8px)',
        'calc-100vh-164': 'calc(100vh - 164.6px)',
      },
    },
  },
  plugins: [],
}

