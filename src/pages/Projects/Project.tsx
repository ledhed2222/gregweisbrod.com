import { ReactNode } from 'react'

import { ExternalLink, Header } from '../../components'

interface Props {
  title: string
  imageSrc: string
  imageAlt: string
  link: string
  children: ReactNode
}

export default function Project({
  link,
  title,
  imageSrc,
  imageAlt,
  children,
}: Props) {
  return (
    <div className="Project">
      <ExternalLink href={link}>
        <img
          src={imageSrc}
          className="ProjectImg"
          alt={imageAlt}
          loading="lazy"
        />
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
