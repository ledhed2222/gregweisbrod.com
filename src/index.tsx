/* eslint-disable import/no-unused-modules --
 * main entry point */
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './App'
import './index.scss'

const container = window.document.getElementById('root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
