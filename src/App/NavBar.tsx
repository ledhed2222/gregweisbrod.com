import { InternalLink } from '../components'
import { PAGES } from '../routes/pages'
import './NavBar.scss'

export default function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        {PAGES.map(({ path, routeName }) => (
          <li key={path}>
            <InternalLink to={path}>{routeName}</InternalLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
