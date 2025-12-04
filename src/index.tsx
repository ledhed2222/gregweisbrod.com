import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { App } from './App'
import { ROUTES } from './ROUTES'
import './index.scss'

const container = window.document.getElementById('root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: <App />,
            children: ROUTES.map((route) => ({
              index: route.path === '/',
              path: route.path === '/' ? undefined : route.path,
              element: route.element,
            })),
          },
        ])}
      />
    </StrictMode>,
  )
}
