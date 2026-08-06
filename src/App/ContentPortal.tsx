import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition as CST } from 'react-transition-group'

import { NOT_FOUND_NODE_REF, ROUTES } from '../routes'
import './ContentPortal.scss'

// Must stay in sync with $transition-time in ContentPortal.scss
const TRANSITION_MS = 250

export default function ContentPortal() {
  const loc = useLocation()
  const out = useOutlet()
  const nodeRef =
    ROUTES.find((route) => route.path === loc.pathname)?.nodeRef ??
    NOT_FOUND_NODE_REF

  return (
    <main className="ContentPortal">
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
