import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'

import './index.scss'

type Props = ComponentProps & {
  href: string
}

export function ExternalLink({
  className,
  children,
  href,
}: Props): JSX.Element {
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
