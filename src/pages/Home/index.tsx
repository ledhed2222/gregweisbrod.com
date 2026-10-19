import { Header } from '../../components'

export default function Home() {
  return (
    <div className="Home">
      <Header>Hi there!</Header>
      <Header as="p" className="subtitle">
        Welcome to my little slice of the Internet{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Header>
    </div>
  )
}
