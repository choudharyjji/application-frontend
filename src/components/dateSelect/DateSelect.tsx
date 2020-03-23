import React from 'react';
import ReactSelect from 'react-select';
import { FixMeType } from '../../type/fix-me.type';
import InputTooltip from '../inputTooltip/inputTooltip';

interface DateSelectProps {
  options: {}[];
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  innerRef?: FixMeType;
  control?: FixMeType;
}

const DateSelect = (props: DateSelectProps) => {
  const {
    options, label, innerRef, name, onBlur, onFocus, control,
  } = props;

  let textInput: HTMLInputElement | null = null;
  const date = new Date();

  const dayOptions = [{ label: '01', value: 1 }];

  const monthOptions = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];


  const handleDayChange = (selectedOption: FixMeType) => {
    date.setDate(selectedOption.value);
    control.setValue(name, date.toISOString().split('T')[0], true);
    if (textInput !== null) {
      textInput.focus();
      textInput.blur();
    }
  };

  const handleMonthChange = (selectedOption: FixMeType) => {
    date.setMonth(selectedOption.value);
    control.setValue(name, date.toISOString().split('T')[0], true);
    if (textInput !== null) {
      textInput.focus();
      textInput.blur();
    }
  };

  const handleYearChange = (selectedOption: FixMeType) => {
    date.setFullYear(selectedOption.value);
    control.setValue(name, date.toISOString().split('T')[0], true);
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
        <div className="w-11/12 flex flex-no-wrap justify-between items-center">
          <div className="w-1/3">
            <ReactSelect
              placeholder="day"
              options={dayOptions}
              defaultValue={null}
              onChange={handleDayChange}
            />
          </div>

          <div className="w-1/3 px-2">
            <ReactSelect
              placeholder="month"
              options={monthOptions}
              defaultValue={null}
              onChange={handleMonthChange}
            />
          </div>

          <div className="w-1/3">
            <ReactSelect
              placeholder="year"
              options={options}
              defaultValue={null}
              onChange={handleYearChange}
            />
          </div>
          <input
            style={{
              width: 0,
              height: 0,
              opacity: 0,
              position: 'absolute',
            }}
            type="date"
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
          <InputTooltip />
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
