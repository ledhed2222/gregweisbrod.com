import classnames from 'classnames'
import React from 'react'

import { ComponentProps } from '../types'
import './index.scss'

export default function Header({
  className,
  children,
}: ComponentProps): JSX.Element {
  return <header className={classnames('Header', className)}>{children}</header>
}
