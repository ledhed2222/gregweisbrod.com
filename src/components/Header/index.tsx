import clsx from 'clsx'

import { ComponentProps } from '../types'

import './index.scss'

export default function Header({ className, children }: ComponentProps) {
  return <header className={clsx('Header', className)}>{children}</header>
}
