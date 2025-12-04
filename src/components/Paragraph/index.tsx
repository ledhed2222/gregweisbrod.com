import classnames from 'classnames'

import { ComponentProps } from '../types'

import './index.scss'

export default function Paragraph({ children, className }: ComponentProps) {
  return <p className={classnames('Paragraph', className)}>{children}</p>
}
