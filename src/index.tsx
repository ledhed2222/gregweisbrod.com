import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from './components'
import { ROUTER } from './routes'
import './index.scss'

const container = window.document.getElementById('root')
if (!container) {
  throw new Error('Root HTML container element not found!')
}
createRoot(container).render(
  <StrictMode>
    {/*
      No Suspense here on purpose. The only lazy things are pages, and their
      boundary lives inside ContentPortal so the nav survives a chunk load. A
      root boundary would sit above App and take the nav down with it.
    */}
    <ErrorBoundary>
      <RouterProvider router={ROUTER} />
    </ErrorBoundary>
  </StrictMode>,
)
