import clsx from 'clsx'

import { ComponentProps } from '../types'

import './index.scss'

type Props = ComponentProps & {
  href: string
}

export default function ExternalLink({ className, children, href }: Props) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={clsx('ExternalLink', className)}
    >
      {children}
    </a>
  )
}
