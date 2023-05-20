import React from 'react'

import { ExternalLink, Header, Paragraph } from '../components'

import ewitool from './ewitool.png'
import nftDemo from './nftDemo.png'
import Project from './Project'
import supercolliderCubes from './supercolliderCubes.gif'
import xpringRuby from './xpringRuby.png'
import './index.scss'

/* eslint-disable max-lines-per-function --
 * there's just a lot of content here */
export default function Projects(): JSX.Element {
  return (
    <div className="Projects">
      <Header>Projects</Header>
      <Project
        title="SuperCollider Cubes (WIP)"
        imageSrc={supercolliderCubes}
        link="https://github.com/ledhed2222/supercollider_cubes"
      >
        <Paragraph>
          Interactive web-based real-time synthesizer using HLS/WebRTC and
          WebSockets for audio streaming. All synthesis happens on the server
          and is streamed to all clients
        </Paragraph>
      </Project>
      <Project
        title="NFT Marketplace on XRPL"
        imageSrc={nftDemo}
        link="https://github.com/ledhed2222/nftdemo"
      >
        <Paragraph>
          Proof-of-concept NFT marketplace on the{' '}
          <ExternalLink href="https://xrpl.org">XRP Ledger</ExternalLink>.
        </Paragraph>
      </Project>
      <Project
        title="xpring-ruby"
        imageSrc={xpringRuby}
        link="https://github.com/ledhed2222/xpring-ruby"
      >
        <Paragraph>
          xpring-ruby is the Ruby client-side library for the Xpring SDK. It
          provides Ruby methods for interacting with the{' '}
          <ExternalLink href="https://xrpl.org">XRP Ledger</ExternalLink>.
        </Paragraph>
      </Project>
      <Project
        title="EWItool"
        imageSrc={ewitool}
        link="https://github.com/ledhed2222/EWItool"
      >
        <Paragraph>
          EWItool is an open-source controller and patch editor for the{' '}
          <ExternalLink href="https://www.akaipro.com/ewi4000s">
            Akai EWI4000s
          </ExternalLink>{' '}
          wind synthesizer.
        </Paragraph>
      </Project>
    </div>
  )
}
/* eslint-enable max-lines-per-function */
