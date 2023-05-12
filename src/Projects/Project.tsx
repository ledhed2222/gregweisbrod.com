import React, { ReactNode } from 'react'

import { Header } from '../components'

interface Props {
  title: string
  imageSrc: string
  link: string
  children: ReactNode
}

export default function Project({
  link,
  title,
  imageSrc,
  children,
}: Props): JSX.Element {
  return (
    <div className="Project">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} className="ProjectImg" alt="" />
      </a>
      <div className="ProjectCopy">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Header className="small">{title}</Header>
        </a>
        {children}
      </div>
    </div>
  )
}
