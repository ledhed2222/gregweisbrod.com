import classnames from 'classnames'

import { ComponentProps } from '../types'

import './index.scss'

type Props = ComponentProps & {
  href: string
}

export function ExternalLink({ className, children, href }: Props) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={classnames('ExternalLink', className)}
    >
      {children}
    </a>
  )
}
