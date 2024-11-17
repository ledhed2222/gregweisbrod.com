import React from 'react'

import { ContentPortal } from './ContentPortal'
import { NavBar } from './NavBar'
import './index.scss'

export function App(): JSX.Element {
  return (
    <div className="App">
      <NavBar />
      <ContentPortal />
    </div>
  )
}
