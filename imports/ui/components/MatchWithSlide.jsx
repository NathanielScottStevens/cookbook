import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import Match from 'react-router/Match';

const styles = {
  root: {
    position: 'relative',
  },
};

const MatchWithSlide = ({ component: Component, ...rest }) => {
  const willLeave = () => ({ left: spring(-window.innerWidth) });

  return (
    <Match {...rest} children={({ matched, ...props }) => (
      // children are rendered regardless of whether or not there is a match
      <TransitionMotion
        // endingStyle
        willLeave={willLeave}
        // starting style
        styles={matched ? [{
          key: props.location.pathname,
          style: { left: 0 },
          data: props
        }] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => (
              <div
                id="thisid"
                key={config.key}
                style={{ ...styles.root, ...config.style }}
              >
                <Component {...config.data} />
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )} />
  );
};

export default MatchWithSlide;
