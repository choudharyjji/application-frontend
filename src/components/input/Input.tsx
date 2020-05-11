import React, { ReactElement } from 'react';
import { InputProp } from './interface/InputProp';
import InputTooltip from '../inputTooltip/InputTooltip';

const Input = (props: InputProp): ReactElement => {
  const {
    label, innerRef, name, value, onChange, onBlur, onFocus, type, prefix,
    placeholder, tooltip, disabled, autoFocus, spellCheck, autoComplete,
  } = props;

  return (
    <>
      <span className="font-light block mb-2 text-sm">
        {label}
      </span>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          <label
            className="bg-white hover:shadow-md hover:border-transparent border border-fiesta-gray rounded-md py-2 px-4 flex w-full appearance-none leading-normal transition ease-in-out duration-500">
            {(prefix) && <span className="inline-flex pr-2">{prefix}</span>}
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
              className="focus:outline-none w-full inline-flex"
              ref={innerRef}
            />
          </label>
        </div>
        <div className="flex">
          {tooltip && <InputTooltip message={tooltip} />}
        </div>
      </div>
    </>
  );
};

export default Input;
