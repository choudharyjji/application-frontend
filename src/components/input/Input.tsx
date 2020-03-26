import React, { ReactElement } from 'react';
import InputTooltip from '../inputTooltip/inputTooltip';
import { InputProp } from './interface/InputProp';

const Input = (props: InputProp): ReactElement => {
  const {
    label, innerRef, name, value, onChange, onBlur, onFocus, type,
    placeholder, tooltip, disabled, autoFocus, spellCheck, autoComplete,
  } = props;

  return (
    <div className="mb-6">
      <span className="font-light block mb-2 text-sm">
        {label}
      </span>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          <label>
            <input
              type={type}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              name={name}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              spellCheck={spellCheck}
              autoComplete={autoComplete}
              className="bg-white focus:outline-none hover:shadow-md hover:border-transparent border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal transition ease-in-out duration-500"
              ref={innerRef}
            />
          </label>
        </div>
        <div className="flex">
          <InputTooltip message={tooltip} />
        </div>
      </div>
    </div>
  );
};

export default Input;
