import React from 'react'

import { Header, Paragraph } from '../components'

export interface Props {
  title: string
  imageSrc: string
  desc: string
  link: string
}

const Project = ({ link, title, desc, imageSrc }: Props): JSX.Element => (
  <div className="Project">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imageSrc} className="ProjectImg" alt="" />
    </a>
    <div className="ProjectCopy">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Header small>{title}</Header>
      </a>
      <Paragraph>{desc}</Paragraph>
    </div>
  </div>
)

export default Project
