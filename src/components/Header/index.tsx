import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.css'

type Props = ComponentProps & {
  small?: true
}

const Header = ({ className, small, children }: Props): JSX.Element => (
  <header className={classnames('Header', className, { small })}>
    {children}
  </header>
)

export default Header
