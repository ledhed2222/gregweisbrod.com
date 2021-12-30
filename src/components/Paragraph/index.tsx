import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.css'

type Props = ComponentProps & {
  indent?: true
}

function Paragraph({ indent, children, className }: Props): JSX.Element {
  return (
    <p className={classnames('Paragraph', className, { indent })}>{children}</p>
  )
}

export default Paragraph
