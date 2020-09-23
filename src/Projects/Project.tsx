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
    <a href={props.link}>
      <img src={props.imageSrc} className="ProjectImg" />
    </a>
    <div className="ProjectCopy">
      <a href={props.link}>
        <Header small>{props.title}</Header>
      </a>
      <Paragraph>{props.desc}</Paragraph>
    </div>
  </div>
);

export default Project;
