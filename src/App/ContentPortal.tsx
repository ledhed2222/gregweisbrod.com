import React, { ReactNode } from 'react';
import {
  Switch,
  useLocation,
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

interface Props {
  children: ReactNode,
};

const ContentPortal = (props: Props) => {
  const location = useLocation();

  return (
    <div className="ContentPortal">
      <TransitionGroup>
        <CSSTransition
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
      </TransitionGroup>
    </div>
  );
};

export default ContentPortal;
