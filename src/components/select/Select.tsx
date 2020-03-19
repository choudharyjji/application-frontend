import React, { ReactElement, useState } from 'react';
import ReactSelect from 'react-select';
import InputTooltip from '../inputTooltip/inputTooltip';
import { FixMeType } from '../../type/fix-me.type';

interface SelectProps {
  options: {}[];
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  innerRef?: FixMeType;
  control?: any;
}

const Select = (props: SelectProps): ReactElement => {
  const {
    options, label, innerRef, name, onBlur, onChange, onFocus, control,
  } = props;

  let textInput: HTMLInputElement | null = null;

  const handleChange = (selectedOption: any) => {
    control.setValue(name, selectedOption.value, true);
    if (textInput !== null) {
      textInput.focus();
      textInput.blur();
    }
  };


  return (
    <div className="my-6">
      <label className="font-light block mb-2 text-sm">
        {label}
      </label>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          <ReactSelect
            options={options}
            defaultValue={null}
            onChange={handleChange}
          />
          <input
            style={{
              width: 0,
              height: 0,
              opacity: 0,
              position: 'absolute',
            }}
            name={name}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={(e) => {
              textInput = e;
              innerRef(e);
            }}
          />
        </div>
        <div className="flex ml-3">
          <InputTooltip />
        </div>
      </div>
    </div>
  );
};

export default Select;
