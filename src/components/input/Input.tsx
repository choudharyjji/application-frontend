import React, { ReactElement } from 'react';
import InputTooltip from '../inputTooltip/inputTooltip';
import { InputProp } from './interface/InputProp';
import { FieldType } from '../../lib/dynamic-form/util/form-generator/interface/field.interface';

const Input = (props: InputProp): ReactElement => {
  const {
    label, innerRef, name, value, onChange, onBlur, onFocus, type,
    placeholder, tooltip, disabled, autoFocus, spellCheck, autoComplete,
  } = props;

  const inputClass = type === FieldType.CHECKBOX
    ? ''
    : 'bg-white focus:outline-none hover:shadow-md hover:border-transparent border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal transition ease-in-out duration-500';

  return (
    <div className="my-6">
      <label className="font-light block mb-2 text-sm">
        {label}
      </label>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
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
            className={inputClass}
            ref={innerRef}
          />
        </div>
        <div className="flex">
          <InputTooltip message={tooltip} />
        </div>
      </div>
    </div>
  );
};

export default Input;
