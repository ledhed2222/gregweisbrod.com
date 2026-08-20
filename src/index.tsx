import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { ErrorBoundary, Loading } from './components'
import { ROUTER } from './routes'
import './index.scss'

const container = window.document.getElementById('root')
if (!container) {
  throw new Error('Root HTML container element not found!')
}
createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      {/*
        A backstop only. Lazy pages are caught by the nearer boundary inside
        ContentPortal, which is what keeps the nav on screen while a chunk
        loads. This one catches anything that suspends outside the content
        region, where blanking the app is the correct fallback.
      */}
      <Suspense fallback={<Loading />}>
        <RouterProvider router={ROUTER} />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
