import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs' : '540px',
      'md' : '768px',
      'lg' : '1024px',
      'xl' : '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Red template
        //'main-light-dark': '#940a0e',
        //'main-heading': '#940a0e',
        //'main-emphasize': '#940a0e',
        //'main-link': '#940a0e',
        //'main-link-hover': '#500404',
        //'main-login': "#e0c1c1",
        //'main-dark': '#500404',
        //'main-light': '#e0c1c1',
        //'main-map-stroke': '#e0c1c1',

        // Blue template
        //#002f55
        'blue-50': '#E3F2FD',
        'main-dark': '#001F3F',    
        'main-dark-blue': '#002970',
        'main-map-hover': '#003797', 
        'main-light': '#f8f8ff',
        'main-gray': '#d2d2d2',

        'main-heading': '#004B88',
        'main-map': "#007CBD",
        'main-emphasize': '#004B88',
        'main-link': '#004B88',
        'main-link-hover': '#009FE3',
        'main-login': "#dbeafe",
        'main-map-stroke': "#3388ff",

      },
      height: {
        18: '4.5rem'
      },
      /*
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      */
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
    },
  },
  plugins: [],
} satisfies Config;
