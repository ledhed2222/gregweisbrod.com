import { ReactNode, RefObject, createRef, lazy } from 'react'

const Home = lazy(() => import('./Home'))
const Projects = lazy(() => import('./Projects'))
const About = lazy(() => import('./About'))

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
].map((route) => Object.assign(route, { nodeRef: createRef<HTMLDivElement>() }))
