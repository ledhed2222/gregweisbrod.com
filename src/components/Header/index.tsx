import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.css'

type Props = ComponentProps & {
  small?: true
}

function Header({ className, children, small }: Props): JSX.Element {
  return (
    <header className={classnames('Header', className, { small })}>
      {children}
    </header>
  )
}

export default Header
