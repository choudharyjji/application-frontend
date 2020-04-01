import React, { ReactElement, useEffect } from 'react';
import ReactSelect from 'react-select';
import moment from 'moment';
import { Control } from 'react-hook-form';
import { FixMeType } from '../../type/fix-me.type';
import InputTooltip from '../inputTooltip/InputTooltip';

interface DateSelectProps {
  name: string;
  label: string;
  tooltip?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  innerRef?: FixMeType;
  control: Control;
  minDate?: Date;
  maxDate?: Date;
}

const DateSelect = (props: DateSelectProps): ReactElement => {
  const {
    label, tooltip, innerRef, name, onBlur, onFocus, control, minDate, maxDate,
  } = props;
  let textInput: HTMLInputElement | null = null;
  const date = moment();
  useEffect(() => {
    control.setValue(name, date.toISOString().split('T')[0], false);
  });
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

  const minDateValue = minDate ? moment(minDate) : moment().subtract(100, 'years');
  const maxDateValue = maxDate ? moment(maxDate) : moment();

  const yearOptions = (): {}[] => {
    const start = minDateValue.year();
    const end = maxDateValue.year();
    const result: { label: string; value: number }[] = [];

    for (let i = end; i >= start; i--) {
      result.push({ label: `${i}`, value: i });
    }
    return result;
  };
  const dayOptions = (): {}[] => {
    const result: { label: string; value: number }[] = [];
    for (let i = 1; i <= 31; i++) {
      result.push({ label: `${i < 10 ? `0${i}` : i}`, value: i });
    }
    return result;
  };

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


  const formValues = { ...control.defaultValuesRef.current, ...control.getValues() };
  const defaultValue = formValues[name] instanceof Date ? formValues[name] : new Date(formValues[name]);
  const defaultValueDay = { label: defaultValue.getDate(), value: defaultValue.getDate() };
  const defaultValueMonth = monthOptions.find((option) => option.value === defaultValue.getMonth() + 1);
  const defaultValueYear = { label: defaultValue.getFullYear(), value: defaultValue.getFullYear() };

  const handleDayChange = (selectedOption: FixMeType) => {
    date.day(selectedOption.value);
    control.setValue(name, date.toISOString().split('T')[0]);
    control.reRender();
    if (textInput !== null) {
      textInput.focus();
      textInput.blur();
    }
  };

  const handleMonthChange = (selectedOption: FixMeType) => {
    date.month(selectedOption.value);
    control.setValue(name, date.toISOString().split('T')[0]);
    control.reRender();
    if (textInput !== null) {
      textInput.focus();
      textInput.blur();
    }
  };

  const handleYearChange = (selectedOption: FixMeType) => {
    date.year(selectedOption.value);
    control.setValue(name, date.toISOString().split('T')[0]);
    control.reRender();
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
              styles={customStyles}
              placeholder="day"
              options={dayOptions()}
              onChange={handleDayChange}
            />
          </div>

          <div className="w-1/3 px-2">
            <ReactSelect
              styles={customStyles}
              placeholder="month"
              options={monthOptions}
              defaultValue={null}
              onChange={handleMonthChange}
            />
          </div>

          <div className="w-1/3">
            <ReactSelect
              styles={customStyles}
              placeholder="year"
              options={yearOptions()}
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
          {tooltip && <InputTooltip message={tooltip} />}
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
