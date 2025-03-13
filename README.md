# Patrick Mauboussin's Minimalist Blog

A hyper-minimal blog built with Next.js, Tailwind CSS, and MDX via Contentlayer.

## Features

- Minimalist design with clean typography
- MDX support for rich content
- Automatic page view tracking via Vercel Analytics
- One-click deployment to Vercel

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### Adding Content

1. Create a new `.mdx` file in the `content/posts` directory
2. Add frontmatter with the following fields:
   ```mdx
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   tags: [tag1, tag2]
   featured: true  # Optional, set to true to feature on homepage
   ---
   ```
3. Write your content in Markdown with optional JSX components

### Deployment

The blog is automatically deployed to Vercel when changes are pushed to the main branch.

## Workflow

1. Create/edit MDX files in the `content/posts` directory
2. Commit and push to GitHub
3. Vercel automatically builds and deploys the site

## Technologies

- [Next.js](https://nextjs.org/) with App Router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Contentlayer](https://contentlayer.dev/) for MDX handling
- [Vercel Analytics](https://vercel.com/analytics) for page view tracking
