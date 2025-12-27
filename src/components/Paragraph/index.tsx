import clsx from 'clsx'

import { ComponentProps } from '../types'

import './index.scss'

export default function Paragraph({ children, className }: ComponentProps) {
  return <p className={clsx('Paragraph', className)}>{children}</p>
}
