import React, { ReactElement } from 'react';
import InputTooltip from '../inputTooltip/inputTooltip';
import { InputProp } from '../input/interface/InputProp';

const Checkbox = (props: InputProp): ReactElement => {
  const {
    label, innerRef, name, value, onChange, onBlur, onFocus,
    placeholder, disabled, autoFocus, spellCheck, autoComplete,
  } = props;

  return (
    <div className="my-6">
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          <label className="flex justify-start items-start">
            <div
              className="bg-white border-1 rounded border-gray-600 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
            >
              <input
                type="checkbox"
                className="opacity-0 absolute"
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
                ref={innerRef}
              />
              <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20">
                <rect fill="#1d354e" x="10%" y="10%" width="80%" height="80%" rx="3" ry="3" />
              </svg>
            </div>
            <div className="select-none">{label}</div>
          </label>

        </div>
      </div>
    </div>
  );
};

export default Checkbox;
