import { Header, InternalLink } from '../../components'

export default function NotFound() {
  return (
    <div className="NotFound">
      <Header>Page not found</Header>
      <InternalLink to="/">Go back home</InternalLink>
    </div>
  )
}
