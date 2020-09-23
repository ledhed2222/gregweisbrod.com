import React from 'react';

import { Header, Paragraph } from '../components';

const About = () => (
  <div className="About">
    <Header>
      About Me
    </Header>
    <Paragraph indent>
      Hey there, I'm a software engineer based in New York. I've worked in healthcare tech, e-commerce, and fin tech in various roles, on various stacks. But before I entered the software world I was a classical musician <span role="img" aria-label="scream">😱</span>
    </Paragraph>
    <Paragraph>
      This site will hold various personal projects across software and music. I might even add a blog in the future if I'm feeling particularly ambitious. Thanks for visiting!
    </Paragraph>
  </div>
);

export default About;