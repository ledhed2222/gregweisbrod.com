import React from 'react';

import { Header } from '../components';
import Project, { Props as ProjectType } from './Project';
import xpringRuby from './xpring-ruby.png';
import ewitool from './ewitool.png';
import './index.css';

const projectList: Array<ProjectType> = [
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
    { projectList.map((project) => <Project {...project} />) }
  </div>
);

export default Projects;
