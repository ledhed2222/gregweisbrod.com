import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ContentPortal from './ContentPortal'
import NavBar from './NavBar'
import './index.scss'

export default function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ContentPortal />
      </BrowserRouter>
    </div>
  )
}
