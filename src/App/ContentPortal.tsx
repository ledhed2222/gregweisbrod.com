import React, { ReactNode } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CSSTransition as CST, TransitionGroup } from 'react-transition-group'

import ROUTES from './ROUTES'
import './ContentPortal.scss'

interface RouteWrapperProps {
  children: ReactNode
}

function RouteWrapper({ children }: RouteWrapperProps): JSX.Element {
  const { key: locationKey } = useLocation()

  return (
    <TransitionGroup component={null}>
      <CST key={locationKey} classNames="fade" timeout={300}>
        {children}
      </CST>
    </TransitionGroup>
  )
}

export default function ContentPortal(): JSX.Element {
  return (
    <div className="ContentPortal">
      <div className="Content">
        <Routes>
          {ROUTES.map(({ path, Component }) => (
            <Route
              path={path}
              key={path}
              element={
                <RouteWrapper>
                  <Component />
                </RouteWrapper>
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  )
}
