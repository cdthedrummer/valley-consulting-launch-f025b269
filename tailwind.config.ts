
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Dashboard specific colors
				"dashboard-bg": "hsl(var(--dashboard-bg))",
				"widget-bg": "hsl(var(--widget-bg))",
				"widget-border": "hsl(var(--widget-border))",
				"stat-text": "hsl(var(--stat-text))",
				"chart-primary": "hsl(var(--chart-primary))",
				"chart-secondary": "hsl(var(--chart-secondary))",
				"chart-accent": "hsl(var(--chart-accent))",
				"gradient-from": "hsl(var(--gradient-from))",
				"gradient-to": "hsl(var(--gradient-to))",
				// HVCG custom colors - enhanced for dark mode
				hvcg: {
					'blue-dark': '#0E3B65',
					'blue': '#2C73C8',
					'blue-light': '#5A9BE4',
					'green': '#3AAA35',
					'green-light': '#6DC968',
					'gray': '#18181b',
				},
				// Consulting Noir gold palette
				gold: {
					DEFAULT: '#B89D63',
					light: '#D4BC8F',
					dark: '#9C7945',
					glow: 'rgba(184, 157, 99, 0.2)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
					  opacity: '0',
					  transform: 'translateY(10px)'
					},
					'100%': {
					  opacity: '1',
					  transform: 'translateY(0)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(184, 157, 99, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(184, 157, 99, 0.6)'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Montserrat', 'sans-serif'],
			},
			fontSize: {
				table: ["0.95rem", { lineHeight: "1.5rem", letterSpacing: "0.01em" }],
				"table-xs": ["0.8125rem", { lineHeight: "1.25rem", letterSpacing: "0.02em" }],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
