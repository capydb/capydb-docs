# CapyDB Documentation

This is a Next.js implementation of the CapyDB documentation site, migrated from Nextra.

## Features

- Pure Next.js implementation without Nextra
- Maintains the same UI/UX as the original Nextra-based site
- Supports MDX content
- Language switching between Python and TypeScript
- Table of contents navigation
- Responsive design

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: React components
- `src/context`: React context providers
- `src/lib`: Utility functions
- `src/styles`: Global styles
- `src/content`: MDX content files

## MDX Components

The site uses custom MDX components to render the documentation content. These components are defined in `src/components/MDXComponents.tsx`.

## Language Switching

The site supports switching between Python and TypeScript code examples. This is implemented using the `LanguageContext` and `LanguageContent` components.

## Deployment

The site can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or AWS Amplify. 