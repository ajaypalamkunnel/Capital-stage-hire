import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:    '#f8be1e',
        amber:   '#eb8b09',
        dark:    '#000000',
        surface: '#0f0f0f',
        surface2:'#1a1a1a',
        border:  '#2a2a2a',
      },
    },
  },
  plugins: [],
}
export default config
