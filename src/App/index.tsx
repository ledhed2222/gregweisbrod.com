import classnames from 'classnames'
import React, { ReactNode } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import About from '../About'
import Home from '../Home'
import Projects from '../Projects'
import './index.css'

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

function TheLinks(): JSX.Element {
  return (
    <ul>
      {ROUTES.map(({ path, routeName }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }): string =>
              classnames({ currentPage: isActive })
            }
          >
            {routeName}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

interface RouteWrapperProps {
  children: ReactNode
}

function RouteWrapper({ children }: RouteWrapperProps): JSX.Element {
  const { key: locationKey } = useLocation()

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={locationKey} classNames="fade" timeout={300}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}

function TheRoutes(): JSX.Element {
  return (
    <Routes>
      {ROUTES.map(({ path, Component }) => (
        <Route
          path={path}
          key={path}
          element={
            <RouteWrapper>
              <Component />
            </RouteWrapper>
          }
        />
      ))}
    </Routes>
  )
}

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="NavBar">
          <TheLinks />
        </nav>
        <div className="ContentPortal">
          <div className="Content">
            <TheRoutes />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
