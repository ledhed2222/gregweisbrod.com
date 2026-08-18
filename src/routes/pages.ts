// vite.config.ts imports this to generate sitemap.xml, so it must hold data
// only. It must never reference a page component — not a static import, not a
// JSX element, not even a `() => import('../pages/Home')` loader. Any of those
// pull the component graph into Vite's config bundler, which has no SCSS loader
// and fails to load the config. `component` is therefore a plain directory name
// under src/pages/, resolved to a module by ./index.tsx.
export const PAGES = [
  { path: '/', routeName: 'Home', component: 'Home' },
  { path: '/projects', routeName: 'Projects', component: 'Projects' },
  { path: '/about', routeName: 'About', component: 'About' },
] as const
