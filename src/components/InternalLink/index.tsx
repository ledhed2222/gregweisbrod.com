import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { ComponentProps } from '../types'

import './index.scss'

type Props = ComponentProps & {
  to: string
}

export default function InternalLink({ className, children, to }: Props) {
  return (
    <Link to={to} className={clsx('InternalLink', className)}>
      {children}
    </Link>
  )
}
