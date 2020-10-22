import React from 'react';

import { Header } from '../components';
import Project, { Props as ProjectType } from './Project';
import xpringRuby from './xpring-ruby.png';
import ewitool from './ewitool.png';
import supercollider_cubes from './supercollider_cubes.gif';
import './index.css';

const projectList: Array<ProjectType> = [
  {
    title: 'SuperCollider Cubes (WIP)',
    imageSrc: supercollider_cubes,
    desc: 'Interactive web-based real-time synthesizer using HLS/WebRTC and WebSockets for audio streaming. All synthesis happens on the server and is streamed to all clients',
    link: 'https://github.com/ledhed2222/supercollider_cubes',
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
];

const Projects = () => (
  <div className="Projects">
    <Header>
      Projects
    </Header>
    { projectList.map((project, i) => <Project key={i} {...project} />) }
  </div>
);

export default Projects;
