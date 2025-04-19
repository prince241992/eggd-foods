
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
				// Custom colors for our sweets shop
                sweet: {
                    50: '#FFF8ED',
                    100: '#FFEFD4',
                    200: '#FFDFA8',
                    300: '#FFCB7C',
                    400: '#FFB44F',
                    500: '#FF9A23',
                    600: '#FC8201',
                    700: '#DD6A00',
                    800: '#B85100',
                    900: '#763300',
                },
                spice: {
                    50: '#FDF2F2',
                    100: '#FCE4E4',
                    200: '#FACCCC',
                    300: '#F6A6A6',
                    400: '#F27575',
                    500: '#E83A3A',
                    600: '#D32F2F',
                    700: '#B22626',
                    800: '#942121',
                    900: '#7A1F1F',
                },
                cream: {
                    50: '#FDFCFB',
                    100: '#F9F6F3',
                    200: '#F5EFE6',
                    300: '#EDE3D4',
                    400: '#E5D5C0',
                    500: '#D9C2A3',
                    600: '#C7A980',
                    700: '#B28F65',
                    800: '#8F7047',
                    900: '#614D31',
                },
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
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    },
                },
                'zoom': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                    },
                    '50%': {
                        transform: 'scale(1.05)',
                    },
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'zoom': 'zoom 12s ease-in-out infinite'
			},
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'display': ['Poppins', 'sans-serif'],
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
