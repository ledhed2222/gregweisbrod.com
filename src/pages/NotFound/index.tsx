import { Link } from 'react-router-dom'

import { Header, Paragraph } from '../../components'

export default function NotFound() {
  return (
    <div className="NotFound">
      <Header>Page not found</Header>
      <Paragraph>
        <Link to="/">Go back home</Link>
      </Paragraph>
    </div>
  )
}
