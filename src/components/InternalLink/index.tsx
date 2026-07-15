import { NavLink, NavLinkRenderProps } from 'react-router-dom'

import { ComponentProps } from '../types'

import './index.scss'

type Props = Omit<ComponentProps, 'className'> & {
  className?: string | ((props: NavLinkRenderProps) => string)
  to: string
}

export default function InternalLink({ className, children, to }: Props) {
  return (
    <NavLink
      to={to}
      className={(navState) =>
        (typeof className === 'function' ? className(navState) : className) ??
        'InternalLink'
      }
    >
      {children}
    </NavLink>
  )
}
