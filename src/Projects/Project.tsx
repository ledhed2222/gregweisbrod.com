import { ReactNode } from 'react'

import ExternalLink from '../components/ExternalLink'
import Header from '../components/Header'

interface Props {
  title: string
  imageSrc: string
  link: string
  children: ReactNode
}

export default function Project({ link, title, imageSrc, children }: Props) {
  return (
    <div className="Project">
      <ExternalLink href={link}>
        <img src={imageSrc} className="ProjectImg" alt="" />
      </ExternalLink>
      <div className="ProjectCopy">
        <ExternalLink href={link}>
          <Header className="small">{title}</Header>
        </ExternalLink>
        {children}
      </div>
    </div>
  )
}
