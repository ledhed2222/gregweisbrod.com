// vite.config.ts imports this to generate sitemap.xml, so it must hold data
// only: strings, never a component reference. `component` is a directory name
// under src/pages/, imported by ./index.tsx.
export interface Page {
  readonly path: string
  readonly routeName: string
  readonly component: string
}

export const PAGES: readonly Page[] = [
  { path: '/', routeName: 'Home', component: 'Home' },
  { path: '/projects', routeName: 'Projects', component: 'Projects' },
  { path: '/about', routeName: 'About', component: 'About' },
]
