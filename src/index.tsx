import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Loading } from './components'
import { ROUTER } from './routes'
import './index.scss'

const container = window.document.getElementById('root')
if (!container) {
  throw new Error('Root HTML container element not found!')
}
createRoot(container).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={ROUTER} />
    </Suspense>
  </StrictMode>,
)
