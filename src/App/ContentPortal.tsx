import { CSSProperties } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition as CST } from 'react-transition-group'

import { NOT_FOUND_NODE_REF, ROUTES } from '../routes'
import './ContentPortal.scss'

// The only definition of the fade duration. ContentPortal.scss reads it
// through the custom property below rather than declaring its own copy.
const TRANSITION_MS = 250

// CSSTransition's timeout is not the fade length. It is when the transition is
// declared over, and under unmountOnExit that is when the exiting node is torn
// out. It has to outlast the fade: setting the two equal makes the unmount race
// the fade's final frame, which shows up as a flash between pages. That is why
// this is a separate number rather than TRANSITION_MS reused.
const UNMOUNT_SLACK_MS = 50
const TIMEOUT_MS = TRANSITION_MS + UNMOUNT_SLACK_MS

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
          timeout={TIMEOUT_MS}
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
