import React, { ReactElement } from 'react';
import { ButtonProp } from './interface/ButtonProp';

const Button = (props: ButtonProp): ReactElement => {
  const {
    label, type, onClick, disabled, color,
  } = props;

  let bgColor = null;
  let textColor = null;
  switch (color) {
    case 'blue':
      bgColor = 'bg-fiesta-dark-blue';
      textColor = 'text-white';
      break;
    case 'yellow':
      bgColor = 'bg-fiesta-yellow';
      textColor = 'text-black';
      break;
    default:
      bgColor = 'bg-white';
      textColor = 'text-white';
      break;
  }

  return (
    <button
      className={`${bgColor} ${textColor}  rounded-full uppercase font-bold px-8 py-3 focus:outline-none hover:shadow-xl transition ease-in-out duration-500`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
