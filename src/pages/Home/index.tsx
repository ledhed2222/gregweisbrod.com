import { Header } from '../../components'

import './index.scss'

export default function Home() {
  return (
    <div className="Home">
      <Header>Hi there!</Header>
      <p className="subtitle">
        Welcome to my little slice of the Internet{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </p>
    </div>
  )
}
