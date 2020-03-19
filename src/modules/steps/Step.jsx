import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Step = (props) => {
  const { active } = props;

  const stepClass = classNames({
    'h-1': true,
    'rounded-full': true,
    'bg-gray-300': !active,
    'bg-yellow-400': active,
  });
  return (
    <div className="flex-1 px-3">
      <div className={stepClass} />
    </div>
  );
};

Step.propTypes = {
  active: PropTypes.bool,
};

Step.defaultProps = {
  active: false,
};

export default Step;
