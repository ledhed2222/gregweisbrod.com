import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.css'

type Props = ComponentProps & {
  indent?: true
}

const Paragraph = ({ className, indent, children }: Props): JSX.Element => (
  <p
    className={classnames('Paragraph', className, {
      indent,
    })}
  >
    {children}
  </p>
)

export default Paragraph
