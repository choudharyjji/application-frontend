import React, { ReactElement } from 'react';

interface InputTooltipProp {
  message?: string;
}

const InputTooltip = (props: InputTooltipProp): ReactElement => {
  const { message } = props;
  return (
    <div
      title={message}
      className="text-center flex items-center justify-center  bg-white border border-gray-700 rounded-full h-5 w-5 hover:border-red-700 transition ease-in-out duration-300 cursor-pointer"
    >
      ?
    </div>
  );
};

export default InputTooltip;
