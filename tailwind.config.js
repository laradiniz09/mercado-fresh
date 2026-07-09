/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ─── Colors (Figma variables → Tailwind tokens) ─────────────────────────
      colors: {
        // Fresh / Brand palette
        fresh: {
          DEFAULT: '#2e7d52',   // Fresh/Primary-fresh
          dark:    '#1f5d3b',   // Fresh/Primary-dark
          light:   '#0bb759',   // Fresh/Primary-light
        },
        // Neutral scale
        neutral: {
          50:  '#ffffff',  // Neutral/Neutral-50
          100: '#f9f9f9',  // Neutral/Neutral-100
          150: '#d9d9d9',  // Neutral/Neutral-150
          250: '#6b7280',  // Neutral/Neutral-250
          300: '#2d2d2d',  // Neutral/Neutral-300
        },
        // Semantic content (text / icon) colors
        content: {
          primary:   '#2d2d2d', // Text/text-primary
          secondary: '#6b7280', // Text/text-secundary
          tertiary:  '#9ca3af', // Text/text-terceary
          inverse:   '#ffffff', // Text/text-inverse
          brand:     '#2e7d52', // Text/text-brand
          disabled:  '#b7bbc2', // Text/text-disabled
        },
        // Semantic background surfaces
        surface: {
          DEFAULT: '#ffffff',  // bg-surface
          muted:   '#f9f9f9',  // bg-default
          brand:   '#2e7d52',  // bg-brand
        },
        // Stroke / border tokens
        stroke: {
          DEFAULT: '#d9d9d9',  // stroke/border-default & divider
          active:  '#2d2d2d',  // stroke/border-active
        },
        // Status / feedback colors
        orange: {
          50:  '#ffae88',  // Orange/Orange-50
          100: '#e57241',  // Orange/Orange-100
          200: '#f26522',  // Orange/Orange-200
        },
        danger: '#ef4444',  // Red/Red-100
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        heading: ['Roboto', 'sans-serif'],   // Font-family/Heading
        body:    ['Inter',  'sans-serif'],   // Font-family/Body
        sans:    ['Inter',  'sans-serif'],   // default
      },
      fontSize: {
        'heading-xl': ['24px', { lineHeight: '1.1', fontWeight: '700' }], // heading-xl
        'heading-md': ['18px', { lineHeight: '1.1', fontWeight: '700' }], // heading-md
        'heading-sm': ['16px', { lineHeight: '1.2', fontWeight: '600' }], // heading-sm
        'body-md':    ['14px', { lineHeight: '1.5' }],                    // body-md
        'body-sm':    ['12px', { lineHeight: '1.5' }],                    // body-sm
        'body-xsm':   ['10px', { lineHeight: '1.4' }],                   // body-xsm
      },

      // ─── Spacing (design tokens) ─────────────────────────────────────────────
      // Tailwind default: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 7=28px, 8=32px
      // Figma uses: spacing-2=2px, spacing-4=4px, spacing-8=8px, spacing-12=12px,
      //             spacing-16=16px, spacing-24=24px, spacing-32=28px (note the mapping)
      // We keep Tailwind defaults and add the specific values needed:
      spacing: {
        '0.5': '2px',   // spacing-2 (Figma)
        '11':  '44px',  // iOS status bar height
        '14':  '56px',  // nav bar height
        '34':  '136px',
        '98':  '392px',
      },

      // ─── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        sm:    '8px',   // card icons / small elements
        card:  '16px',  // mid-level cards
        lg:    '24px',  // large containers / inputs
        xl:    '32px',  // screen cards / main containers
        phone: '44px',  // phone frame corners
      },

      // ─── Shadows ────────────────────────────────────────────────────────────
      boxShadow: {
        'send-btn':   '0px 8px 8px rgba(34, 197, 94, 0.25)',
        'ai-card':    '0px 20px 20px rgba(0, 0, 0, 0.02), 0px 4px 10px rgba(0, 0, 0, 0.03)',
        'spinner':    '0px 8px 16px #d9d9d9',
      },

      // ─── Animation ──────────────────────────────────────────────────────────
      keyframes: {
        spin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },
      animation: {
        'spin-slow':  'spin 1.2s linear infinite',
        'fade-in':    'fade-in 0.3s ease-out',
        'pulse-dot':  'pulse-dot 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
