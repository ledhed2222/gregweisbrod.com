import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

import './index.scss'

function Fallback() {
  return (
    <div className="ErrorBoundary">
      <p>Something went wrong.</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}

interface Props {
  children: ReactNode
}

export default function ErrorBoundary({ children }: Props) {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => console.error(error, info)}
    >
      {children}
    </ReactErrorBoundary>
  )
}
