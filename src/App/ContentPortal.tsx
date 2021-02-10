import React, {
  ReactNode,
  useRef,
} from 'react';
import {
  Switch,
  useLocation,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

interface Props {
  children: ReactNode,
}

const ContentPortal = (props: Props): JSX.Element => {
  const location = useLocation();
  const ref = useRef(null);

  return (
    <div className="ContentPortal">
      <CSSTransition
        noderef={ref}
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <div className="Content">
          <Switch location={location}>
            { props.children }
          </Switch>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ContentPortal;
