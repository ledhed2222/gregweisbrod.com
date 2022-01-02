import classnames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'

import ROUTES from './ROUTES'
import './NavBar.scss'

export default function NavBar(): JSX.Element {
  return (
    <nav className="NavBar">
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
    </nav>
  )
}
