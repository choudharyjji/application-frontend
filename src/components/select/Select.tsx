import React, { ReactElement, useState } from 'react';
import { default as BaseSelect } from 'react-select';
import InputTooltip from '../inputTooltip/inputTooltip';
import { FixMeType } from '../../type/fix-me.type';

interface SelectProps {
  options: {}[];
  name: string;
  label: string;
  innerRef?: FixMeType;
}

const Select = (props: SelectProps): ReactElement => {
  const {
    options, label, innerRef, name,
  } = props;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (selectedOption: any) => {
    setInputValue(selectedOption.value);
  };

  return (
    <div className="my-6">
      <label className="font-light block mb-2 text-sm">
        {label}
      </label>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          <BaseSelect
            options={options}
            defaultValue={null}
            onChange={handleChange}
          />
          <input name={name} type="hidden" ref={innerRef} value={inputValue} />
        </div>
        <div className="flex ml-3">
          <InputTooltip />
        </div>
      </div>
    </div>
  );
};

export default Select;
