import clsx from 'clsx'

import { InternalLink } from '../components'
import { ROUTES } from '../routes'
import './NavBar.scss'

export default function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        {ROUTES.map(({ path, routeName }) => (
          <li key={path}>
            <InternalLink
              to={path}
              className={({ isActive }): string =>
                clsx('NavLink', { currentPage: isActive })
              }
            >
              {routeName}
            </InternalLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
