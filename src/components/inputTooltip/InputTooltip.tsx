import React, { ReactElement, useState } from 'react';

import './InputTooltip.css';

interface InputTooltipProp {
  message?: string;
}

const InputTooltip = (props: InputTooltipProp): ReactElement => {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleMouseEnter = (): void => {
    setMessageVisible(true);
  };

  const handleMouseLeave = (): void => {
    setMessageVisible(false);
  };

  const isVisibleClass = messageVisible ? 'tooltip-visible' : '';

  const { message } = props;
  return (
    <div className="relative">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={message}
        className="text-center text-xs flex items-center justify-center bg-white border border-gray-700 rounded-full h-5 w-5 hover:border-fiesta-red hover:text-fiesta-red transition ease-in-out duration-300 cursor-pointer"
      >
        <span>
          ?
        </span>
        <div className={`bg-fiesta-dark-blue tooltip text-white p-1 text-xs text-center rounded-md ${isVisibleClass} `}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default InputTooltip;
