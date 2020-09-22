import React from 'react';
import classnames from 'classnames';

import { ComponentProps } from '../index';
import './index.css';

const Header = (props: ComponentProps) => (
  <header className={classnames('Header', props.className)}>
    { props.children }
  </header>
);

export default Header;
