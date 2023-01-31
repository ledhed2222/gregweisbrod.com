/* eslint-disable import/no-unused-modules --
 * main entry point */
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.scss'

const container = window.document.getElementById('root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
