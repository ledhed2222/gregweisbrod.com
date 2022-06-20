/* eslint-disable import/no-unused-modules --
 * main entry point */
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.scss'

const container = window.document.getElementById('root')

// TODO can't figure out how to do strict mode with both react-router and
// react-transition group and without warnings
if (container) {
  createRoot(container).render(<App />)
}
