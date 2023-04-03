import React, { ReactNode, RefObject, createRef } from 'react'

import About from '../About'
import Home from '../Home'
import Projects from '../Projects'

interface RouteDef {
  path: string
  routeName: string
  element: ReactNode
  nodeRef: RefObject<HTMLDivElement>
}

const ROUTES: RouteDef[] = [
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

export default ROUTES
