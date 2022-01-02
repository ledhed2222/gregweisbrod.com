/* eslint-disable import/no-unused-modules --
 * main entry point */
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  window.document.getElementById('root'),
)
