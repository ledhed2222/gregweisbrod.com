import React from 'react'

import { Header } from '../components'

import ewitool from './ewitool.png'
import nftDemo from './nftDemo.png'
import Project, { Props as ProjectType } from './Project'
import supercolliderCubes from './supercolliderCubes.gif'
import xpringRuby from './xpringRuby.png'

const PROJECTS: ProjectType[] = [
  {
    title: 'SuperCollider Cubes (WIP)',
    imageSrc: supercolliderCubes,
    desc: 'Interactive web-based real-time synthesizer using HLS/WebRTC and WebSockets for audio streaming. All synthesis happens on the server and is streamed to all clients',
    link: 'https://github.com/ledhed2222/supercollider_cubes',
  },
  {
    title: 'NFT Marketplace on XRPL',
    imageSrc: nftDemo,
    desc: 'Proof-of-concept NFT marketplace on the XRPL ledger.',
    link: 'https://github.com/ledhed2222/nftdemo',
  },
  {
    title: 'xpring-ruby',
    imageSrc: xpringRuby,
    desc: 'xpring-ruby is the Ruby client-side library for the Xpring SDK. It provides Ruby methods for interacting with the XRP cryptocurrency ledger.',
    link: 'https://github.com/ledhed2222/xpring-ruby',
  },
  {
    title: 'EWItool',
    imageSrc: ewitool,
    desc: 'EWItool is an open-source controller and patch editor for the Akai EWI4000s wind synthesizer.',
    link: 'https://github.com/ledhed2222/EWItool',
  },
]

export default function Projects(): JSX.Element {
  return (
    <div className="Projects">
      <Header>Projects</Header>
      {PROJECTS.map((project) => (
        <Project
          key={project.title}
          title={project.title}
          imageSrc={project.imageSrc}
          desc={project.desc}
          link={project.link}
        />
      ))}
    </div>
  )
}
