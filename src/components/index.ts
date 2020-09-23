import { ReactNode } from 'react';

import Header from './Header';
import Paragraph from './Paragraph';

export interface ComponentProps {
  className?: string,
  children: ReactNode,
}

export {
  Header,
  Paragraph,
};
