import React, { ReactElement } from 'react';
import InputTooltip from '../inputTooltip/inputTooltip';
import { InputProp } from '../input/interface/InputProp';

const Checkbox = (props: InputProp): ReactElement => {
  const {
    label, innerRef, name, value, onChange, onBlur, onFocus, type,
    placeholder, tooltip, disabled, autoFocus, spellCheck, autoComplete,
  } = props;

  return (
    <div className="my-6">
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          {/* <label> */}
          {/*  <input */}
          {/*    type={type} */}
          {/*    onChange={onChange} */}
          {/*    onBlur={onBlur} */}
          {/*    onFocus={onFocus} */}
          {/*    name={name} */}
          {/*    value={value} */}
          {/*    placeholder={placeholder} */}
          {/*    disabled={disabled} */}
          {/*    autoFocus={autoFocus} */}
          {/*    spellCheck={spellCheck} */}
          {/*    autoComplete={autoComplete} */}
          {/*    ref={innerRef} */}
          {/*  /> */}
          {/* </label> */}


          <label className="flex justify-start items-start">
            <div
              className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
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
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
            <div className="select-none">{label}</div>
          </label>


        </div>
        <div className="flex">
          <InputTooltip message={tooltip} />
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
