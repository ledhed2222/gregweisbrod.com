/* eslint-disable @typescript-eslint/naming-convention --
 * see use of Component */
import React from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

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

/* eslint-disable max-lines-per-function --
 * TODO */
const App = (): JSX.Element => (
  <div className="App">
    <BrowserRouter>
      <nav className="NavBar">
        <ul>
          {ROUTES.map(({ path, routeName }) => (
            <li key={path}>
              <NavLink exact to={path} activeClassName="currentPage">
                {routeName}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ContentPortal">
        {ROUTES.map(({ path, Component }) => (
          <Route exact path={path} key={path}>
            {({ match }): JSX.Element => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <div className="Content">
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </BrowserRouter>
  </div>
)
/* eslint-enable max-lines-per-function */

export default App
