import { ComponentType, lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import App from '../App'
import { ErrorBoundary } from '../components'
import { PAGES } from './pages'

// The prefix and the extension must both stay static literals: Vite rewrites
// this into a glob at build time, which is what keeps each page in its own
// chunk. Collapsing it to import(path) with the whole path in PAGES builds
// without error but emits no page chunks, and every route 404s at runtime.
function loadPage(component: string) {
  return () =>
    import(`../pages/${component}/index.tsx`) as Promise<{
      default: ComponentType
    }>
}

// NotFound is not in PAGES: it belongs in neither the nav nor the sitemap.
const NotFound = lazy(loadPage('NotFound'))

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // React Router wraps the root route in its own error boundary, so a
    // boundary around RouterProvider never sees a render error.
    ErrorBoundary,
    children: [
      ...PAGES.map(({ path, component }) => {
        const Page = lazy(loadPage(component))

        return {
          index: path === '/',
          path: path === '/' ? undefined : path,
          element: <Page />,
        }
      }),
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
