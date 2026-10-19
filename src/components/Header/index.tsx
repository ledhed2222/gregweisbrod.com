import clsx from 'clsx'

import { ComponentProps } from '../types'

import './index.scss'

type Props = ComponentProps & {
  as?: 'h1' | 'h2' | 'p'
}

export default function Header({ as: Tag = 'h1', className, children }: Props) {
  return <Tag className={clsx('Header', className)}>{children}</Tag>
}
