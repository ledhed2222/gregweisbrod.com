import React from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition as CST } from 'react-transition-group'

import ROUTES from './ROUTES'
import './ContentPortal.scss'

export default function ContentPortal(): JSX.Element {
  const loc = useLocation()
  const out = useOutlet()
  const nodeRef = ROUTES.find((route) => route.path === loc.pathname)?.nodeRef

  return (
    <div className="Content">
      <SwitchTransition>
        <CST
          key={loc.key}
          classNames="fade"
          timeout={300}
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef} className="TheContent">
            {out}
          </div>
        </CST>
      </SwitchTransition>
    </div>
  )
}
