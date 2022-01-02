import About from '../About'
import Home from '../Home'
import Projects from '../Projects'

interface RouteDef {
  path: string
  routeName: string
  Component: () => JSX.Element
}

const ROUTES: RouteDef[] = [
  {
    path: '/',
    routeName: 'Home',
    Component: Home,
  },
  {
    path: '/projects',
    routeName: 'Projects',
    Component: Projects,
  },
  {
    path: '/about',
    routeName: 'About',
    Component: About,
  },
]

export default ROUTES
