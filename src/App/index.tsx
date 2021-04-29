import React from 'react'
import {
  BrowserRouter,
  Route,
  NavLink,
} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import Home from '../Home'
import Projects from '../Projects'
import About from '../About'
import './index.css'

interface RouteDef {
  path: string,
  name: string,
  Component: () => JSX.Element,
}

const ROUTES: Array<RouteDef> = [
  {
    path: '/',
    name: 'Home',
    Component: Home,
  },
  {
    path: '/projects',
    name: 'Projects',
    Component: Projects,
  },
  {
    path: '/about',
    name: 'About',
    Component: About,
  },
]

const App = (): JSX.Element => (
  <div className="App">
    <BrowserRouter>
      <nav className="NavBar">
        <ul>
          { ROUTES.map(({ path, name }) => (
            <li key={path}>
              <NavLink exact to={path} activeClassName="currentPage">
                { name }
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ContentPortal">
        { ROUTES.map(({ path, Component }) => (
          <Route exact path={path} key={path}>
            {({ match }) => (
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

export default App
