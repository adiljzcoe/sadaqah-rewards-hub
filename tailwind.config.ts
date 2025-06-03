
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
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'cinzel': ['Cinzel', 'serif'],
			},
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
				// Vibrant Candy Crush inspired colors
				'candy-pink': {
					50: '#fef7ff',
					100: '#feeeff',
					200: '#fdd4ff',
					300: '#fcaaff',
					400: '#f875ff',
					500: '#f441ff',
					600: '#e41cff',
					700: '#c007e3',
					800: '#9f08ba',
					900: '#820a98'
				},
				'electric-blue': {
					50: '#eff9ff',
					100: '#def2ff',
					200: '#b6e9ff',
					300: '#75dbff',
					400: '#2ccaff',
					500: '#00b4ff',
					600: '#0091d5',
					700: '#0074ac',
					800: '#00638e',
					900: '#065275'
				},
				'lime-green': {
					50: '#f7ffe4',
					100: '#ecffc4',
					200: '#d9ff90',
					300: '#bfff50',
					400: '#a3ff1a',
					500: '#84e600',
					600: '#66b800',
					700: '#4d8a00',
					800: '#3f6d07',
					900: '#375c0b'
				},
				'vibrant-orange': {
					50: '#fffaec',
					100: '#fff4d3',
					200: '#ffe6a5',
					300: '#ffd36d',
					400: '#ffb732',
					500: '#ff9f0a',
					600: '#ff8500',
					700: '#cc6402',
					800: '#a14e0b',
					900: '#82420c'
				},
				'purple-magic': {
					50: '#faf5ff',
					100: '#f3e8ff',
					200: '#e9d5ff',
					300: '#d8b4fe',
					400: '#c084fc',
					500: '#a855f7',
					600: '#9333ea',
					700: '#7c3aed',
					800: '#6b21d4',
					900: '#581c87'
				},
				// Keep existing colors for compatibility
				'islamic-green': {
					50: '#f0f9f0',
					100: '#dcf2dc',
					200: '#bce5bc',
					300: '#8ed18e',
					400: '#5bb85b',
					500: '#3aa13a',
					600: '#2b7d2b',
					700: '#246324',
					800: '#1f4f1f',
					900: '#1a421a'
				},
				'sadaqah-gold': {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f'
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
				// Fixed ticker animation
				'ticker': {
					'0%': {
						transform: 'translateX(0)'
					},
					'100%': {
						transform: 'translateX(-50%)'
					}
				},
				// Vibrant animations
				'bounce-in': {
					'0%': {
						transform: 'scale(0.3)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '0.8'
					},
					'70%': {
						transform: 'scale(0.9)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px currentColor' },
					'50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
				},
				'rainbow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'sparkle': {
					'0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
					'50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' }
				},
				'explosion': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'50%': { transform: 'scale(1.5)', opacity: '0.8' },
					'100%': { transform: 'scale(2)', opacity: '0' }
				},
				'slide-in-bounce': {
					'0%': { transform: 'translateX(-100%) scale(0.8)', opacity: '0' },
					'60%': { transform: 'translateX(10%) scale(1.1)', opacity: '0.8' },
					'100%': { transform: 'translateX(0%) scale(1)', opacity: '1' }
				},
				'number-pop': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.5) rotate(5deg)' },
					'100%': { transform: 'scale(1) rotate(0deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ticker': 'ticker 30s linear infinite',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'rainbow': 'rainbow 3s ease infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'explosion': 'explosion 0.8s ease-out',
				'slide-in-bounce': 'slide-in-bounce 0.8s ease-out',
				'number-pop': 'number-pop 0.4s ease-out'
			},
			backgroundImage: {
				'gradient-rainbow': 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080)',
				'gradient-candy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-vibrant': 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
