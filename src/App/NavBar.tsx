import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../routes'
import './NavBar.scss'

export default function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        {ROUTES.map(({ path, routeName }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }): string =>
                clsx('NavLink', { currentPage: isActive })
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
