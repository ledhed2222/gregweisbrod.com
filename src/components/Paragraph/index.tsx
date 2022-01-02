import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.scss'

type Props = ComponentProps & {
  indent?: true
}

export default function Paragraph({
  indent,
  children,
  className,
}: Props): JSX.Element {
  return (
    <p className={classnames('Paragraph', className, { indent })}>{children}</p>
  )
}
