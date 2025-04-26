import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx,html}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,html}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,html}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      spacing: {
        navbar: '7rem',
      },
    },
  },
  plugins: [],
}
export default config