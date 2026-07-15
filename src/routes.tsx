import { ReactNode, RefObject, createRef, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'

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

export const ROUTES: RouteDef[] = [
  {
    path: '/',
    routeName: 'Home',
    element: <Home />,
  },
  {
    path: '/projects',
    routeName: 'Projects',
    element: <Projects />,
  },
  {
    path: '/about',
    routeName: 'About',
    element: <About />,
  },
].map((route) => ({
  ...route,
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
