import React from 'react';
import classnames from 'classnames';

import { ComponentProps } from '../index';
import './index.css';

const Paragraph = (props: ComponentProps) => (
  <p className={classnames('Paragraph', props.className)}>
    { props.children }
  </p>
)

export default Paragraph;
