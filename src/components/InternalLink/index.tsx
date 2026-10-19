import clsx from 'clsx'
import { NavLink } from 'react-router'

import { ComponentProps } from '../types'

import './index.scss'

type Props = ComponentProps & {
  to: string
}

export default function InternalLink({ className, children, to }: Props) {
  return (
    <NavLink to={to} className={clsx('InternalLink', className)}>
      {children}
    </NavLink>
  )
}
