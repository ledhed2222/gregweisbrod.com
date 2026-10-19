import './index.scss'

export default function ErrorBoundary() {
  return (
    <div className="ErrorBoundary">
      <p>Something went wrong.</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}
