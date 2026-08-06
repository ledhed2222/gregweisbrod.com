// Kept free of JSX and React imports so vite.config.ts can import it to
// generate sitemap.xml at build time. Named pageDefs, not pages, to avoid
// colliding with the src/pages/ directory.
export const PAGES = [
  { path: '/', routeName: 'Home' },
  { path: '/projects', routeName: 'Projects' },
  { path: '/about', routeName: 'About' },
] as const

export type PagePath = (typeof PAGES)[number]['path']
