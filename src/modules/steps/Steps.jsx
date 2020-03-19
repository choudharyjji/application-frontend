import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const Steps = (props) => {
  const { step, children } = props;

  return (
    <>
      <div className="flex content-around -mx-3 my-5">
        {children.map((child, index) => {
          const childProps = {
            key: index,
            active: step === index,
          };
          return cloneElement(child, childProps);
        })}
      </div>
    </>
  );
};

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.number,
};

Steps.defaultProps = {
  step: 0,
};

export default Steps;
