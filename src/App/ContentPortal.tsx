import { CSSProperties } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition as CST } from 'react-transition-group'

import { NOT_FOUND_NODE_REF, ROUTES } from '../routes'
import './ContentPortal.scss'

// The only definition of the transition duration. ContentPortal.scss reads it
// through the custom property below rather than declaring its own copy.
const TRANSITION_MS = 250

// Custom properties are not part of the CSSProperties type, hence the cast.
const TRANSITION_STYLE = {
  '--transition-time': `${TRANSITION_MS}ms`,
} as CSSProperties

export default function ContentPortal() {
  const loc = useLocation()
  const out = useOutlet()
  const nodeRef =
    ROUTES.find((route) => route.path === loc.pathname)?.nodeRef ??
    NOT_FOUND_NODE_REF

  return (
    <main className="ContentPortal" style={TRANSITION_STYLE}>
      <SwitchTransition>
        <CST
          key={loc.key}
          classNames="fade"
          timeout={TRANSITION_MS}
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef} className="Content">
            {out}
          </div>
        </CST>
      </SwitchTransition>
    </main>
  )
}
