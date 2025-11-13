import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f0f7ff',
					100: '#e0effe',
					200: '#c7e0fc',
					300: '#a3ccff',
					400: '#7ab1ff',
					500: '#5395ff',
					600: '#3d7ff5',
					700: '#0066cc',
					800: '#003366',
					900: '#001a33',
				},
				secondary: {
					50: '#f3f8ff',
					500: '#336699',
					700: '#1a4d7a',
				},
				accent: {
					500: '#00a9e0',
					600: '#0088b8',
				},
				neutral: {
					50: '#f2f2f2',
					100: '#e6e6e6',
					200: '#cccccc',
					300: '#999999',
					400: '#666666',
					500: '#4d4d4d',
					600: '#333333',
					700: '#262626',
					800: '#1a1a1a',
					900: '#212121',
				},
			},
			fontFamily: {
				sans: ['var(--font-sans)'],
				heading: ['var(--font-heading)'],
			},
		},
	},
	plugins: [],
}
export default config
