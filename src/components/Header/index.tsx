import classnames from 'classnames'

import { ComponentProps } from '../types'

import './index.scss'

export function Header({ className, children }: ComponentProps) {
  return <header className={classnames('Header', className)}>{children}</header>
}
