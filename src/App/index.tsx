import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ContentPortal } from './ContentPortal'
import { NavBar } from './NavBar'
import { ROUTES } from './ROUTES'
import './index.scss'

function App(): JSX.Element {
  return (
    <div className="App">
      <NavBar />
      <ContentPortal />
    </div>
  )
}

export function AppWithRouter(): JSX.Element {
  return (
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
  )
}
