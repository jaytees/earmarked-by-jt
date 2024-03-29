import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-roboto)'],
    },
    extend: {
      colors: {
        background: {
          DEFAULT: '#EDEDED',
        },
        text: {
          disabled: 'rgba(0, 0, 0, 0.38)',
          DEFAULT: '#001e00',
          secondary: '#7b7b7b',
        },
        blue: '#274aff',
        yellow: '#f3cd09',
        green: '#1cf309',
        pink: '#ff00ff',
        lightGreen: '#2bec61',
      },
    },
  },
  plugins: [],
}
export default config
