import { ComponentType, ReactNode, RefObject, createRef, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { PAGES } from './pages'

// Vite statically analyses this glob and code-splits each match, so pages stay
// lazily loaded. It is what lets PAGES name components as plain strings.
const PAGE_MODULES = import.meta.glob<{ default: ComponentType }>(
  '../pages/*/index.tsx',
)

function loadPage(component: string) {
  const key = `../pages/${component}/index.tsx`
  const load = PAGE_MODULES[key]

  if (!load) {
    throw new Error(`No page component found at ${key}`)
  }

  return load
}

// NotFound is not in PAGES: it belongs in neither the nav nor the sitemap.
const NotFound = lazy(loadPage('NotFound'))

interface RouteDef {
  path: string
  routeName: string
  element: ReactNode
  nodeRef: RefObject<HTMLDivElement | null>
}

export const ROUTES: RouteDef[] = PAGES.map(
  ({ path, routeName, component }) => {
    const Page = lazy(loadPage(component))

    return {
      path,
      routeName,
      element: <Page />,
      nodeRef: createRef<HTMLDivElement>(),
    }
  },
)

export const NOT_FOUND_NODE_REF = createRef<HTMLDivElement>()

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...ROUTES.map((route) => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.element,
      })),
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
