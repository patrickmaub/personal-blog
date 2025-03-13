/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--tw-prose-body)',
            maxWidth: 'none',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
              },
            },
            h1: {
              fontWeight: '600',
              fontSize: '2em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.3',
            },
            h2: {
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.3',
            },
            h3: {
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.3',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-code-bg)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              color: 'var(--tw-prose-pre-code)',
              padding: '1em',
              borderRadius: '0.375rem',
              border: '1px solid var(--tw-prose-pre-border)',
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            blockquote: {
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              borderLeftWidth: '2px',
              fontStyle: 'italic',
              paddingLeft: '1em',
              color: 'var(--tw-prose-quote)',
              marginLeft: '0',
              marginRight: '0',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5em',
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5em',
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            img: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            hr: {
              marginTop: '2em',
              marginBottom: '2em',
              borderColor: 'var(--tw-prose-hr)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 