import React, { ReactElement } from 'react';
import { ButtonProp } from './interface/ButtonProp';

const Button = (props: ButtonProp): ReactElement => {
  const {
    label, type, onClick, disabled, fill,
  } = props;

  return (
    <button
      className="bg-fiesta-dark-blue rounded-full uppercase text-white font-bold px-8 py-3 focus:outline-none hover:shadow-xl transition ease-in-out duration-500"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
