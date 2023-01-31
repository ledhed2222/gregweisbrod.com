import React, { useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition as CST } from 'react-transition-group'

import ROUTES from './ROUTES'
import './ContentPortal.scss'

export default function ContentPortal(): JSX.Element {
  const ref = useRef()
  const loc = useLocation()

  return (
    <div className="Content">
      <TransitionGroup>
        <CST key={loc.key} classNames="fade" timeout={300} nodeRef={ref}>
          <Routes location={loc}>
            {ROUTES.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </CST>
      </TransitionGroup>
    </div>
  )
}
