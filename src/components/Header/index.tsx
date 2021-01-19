import React from 'react';
import classnames from 'classnames';

import { ComponentProps } from '../index';
import './index.css';

type Props = ComponentProps & {
  small?: true,
}

const Header = (props: Props): JSX.Element => (
  <header
    className={classnames(
      'Header',
      props.className,
      { small: props.small },
    )}
  >
    { props.children }
  </header>
);

export default Header;
