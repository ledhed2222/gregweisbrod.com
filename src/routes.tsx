import { ReactNode, RefObject, createRef, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { PAGES, PagePath } from './pageDefs'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

interface RouteDef {
  path: string
  routeName: string
  element: ReactNode
  nodeRef: RefObject<HTMLDivElement | null>
}

// Exhaustive over PagePath: adding a page to pages.ts fails to compile here
// until its element is supplied.
const ELEMENTS: Record<PagePath, ReactNode> = {
  '/': <Home />,
  '/projects': <Projects />,
  '/about': <About />,
}

export const ROUTES: RouteDef[] = PAGES.map((page) => ({
  ...page,
  element: ELEMENTS[page.path],
  nodeRef: createRef<HTMLDivElement>(),
}))

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
