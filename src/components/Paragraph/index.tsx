import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.scss'

export default function Paragraph({
  children,
  className,
}: ComponentProps): JSX.Element {
  return <p className={classnames('Paragraph', className)}>{children}</p>
}
