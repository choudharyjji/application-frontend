import React, { ReactElement } from 'react';
import ReactSelect from 'react-select';
import { Control } from 'react-hook-form';
import { FixMeType } from '../../type/fix-me.type';
import InputTooltip from '../inputTooltip/InputTooltip';
import { FieldSelectOptions } from '../../lib/dynamic-form/util/interface/field.interface';

interface SelectProps {
  options: FieldSelectOptions[];
  name: string;
  label: string;
  tooltip?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  innerRef?: FixMeType;
  control: Control;
}

const Select = (props: SelectProps): ReactElement => {
  const {
    options, label, tooltip, innerRef, name, onBlur, onFocus, control,
  } = props;
  let textInput: HTMLInputElement | null = null;

  const formValues = { ...control.defaultValuesRef.current, ...control.getValues() };
  const defaultValue = options.find((option) => option.value === formValues[name]);

  const customStyles = {
    control: (provided: FixMeType) => ({
      ...provided,
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      '&:hover':
        {
          borderColor: '#e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      '&:focus': {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    }),
  };

  const handleChange = (selectedOption: FixMeType): void => {
    control.setValue(name, selectedOption.value);
    if (textInput !== null) {
      textInput.focus();
      textInput.blur();
    }
    control.reRender();
  };

  return (
    <>
      <label className="font-light block mb-2 text-sm">
        {label}
      </label>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12">
          <ReactSelect
            styles={customStyles}
            options={options}
            value={defaultValue}
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
            ref={(e): void => {
              textInput = e;
              innerRef(e);
            }}
          />
        </div>
        <div className="flex ml-3">
          {tooltip && <InputTooltip message={tooltip} />}
        </div>
      </div>
    </>
  );
};

export default Select;
