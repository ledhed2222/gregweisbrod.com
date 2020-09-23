import React from 'react';
import classnames from 'classnames';

import { ComponentProps } from '../index';
import './index.css';

type Props = ComponentProps & {
  indent?: true,
}

const Paragraph = (props: Props) => (
  <p
    className={classnames(
      'Paragraph',
       props.className,
       { indent: props.indent },
    )}
  >
    { props.children }
  </p>
)

export default Paragraph;
