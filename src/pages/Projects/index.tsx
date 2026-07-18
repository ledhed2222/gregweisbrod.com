import { ExternalLink, Header, Paragraph } from '../../components'

import ewitool from './ewitool.webp'
import nftDemo from './nftDemo.webp'
import Project from './Project'
import supercolliderCubes from './supercolliderCubes.webp'
import xpringRuby from './xpringRuby.webp'
import './index.scss'

export default function Projects() {
  return (
    <div className="Projects">
      <Header>Projects</Header>
      <Project
        title="SynthChat (WIP)"
        imageSrc={supercolliderCubes}
        imageAlt="Rotating 3D cubes representing SynthChat's real-time synthesizer visualization"
        link="https://github.com/ledhed2222/synth_chat"
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
        imageAlt="Screenshot of the NFT marketplace demo interface"
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
        imageAlt="xpring-ruby logo"
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
        imageAlt="EWItool patch editor interface for the Akai EWI4000s"
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
