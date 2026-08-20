import { ComponentType, ReactNode, RefObject, createRef, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
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

// Not RefObject<HTMLDivElement>: React 19 dropped the implicit null from
// RefObject, so createRef<T>() now returns RefObject<T | null>. current is
// null until React attaches the node.
type NodeRef = RefObject<HTMLDivElement | null>

interface RouteDef {
  path: string
  routeName: string
  element: ReactNode
  nodeRef: NodeRef
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

export const NOT_FOUND_NODE_REF: NodeRef = createRef<HTMLDivElement>()

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
