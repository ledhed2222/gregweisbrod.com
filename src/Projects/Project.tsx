import React from 'react';

import { Header, Paragraph } from '../components';

export interface Props {
  title: string,
  imageSrc: string,
  desc: string,
  link: string,
};

const Project = (props: Props) => (
  <div className="Project">
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <img src={props.imageSrc} className="ProjectImg" alt="" />
    </a>
    <div className="ProjectCopy">
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <Header small>{props.title}</Header>
      </a>
      <Paragraph>{props.desc}</Paragraph>
    </div>
  </div>
);

export default Project;
