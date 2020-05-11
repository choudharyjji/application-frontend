import React, { ReactElement, useEffect } from 'react';
import ReactSelect from 'react-select';
import moment from 'moment';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  let textInput: HTMLInputElement | null = null;
  const date = moment();

  let selectYearValue: number | null = null;
  let selectMonthValue: number | null = null;
  let selectDayValue: number | null = null;

  const syncWithInputValue = (): void => {
    if (selectYearValue != null && selectMonthValue != null && selectDayValue != null) {
      date.set('year', selectYearValue).set('month', selectMonthValue).set('date', selectDayValue);
      control.setValue(name, date.toDate().toISOString().split('T')[0]);
      if (textInput !== null) {
        textInput.focus();
        textInput.blur();
      }
      control.reRender();
    }
  };

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
    { label: t('January'), value: 0 },
    { label: t('February'), value: 1 },
    { label: t('March'), value: 2 },
    { label: t('April'), value: 3 },
    { label: t('May'), value: 4 },
    { label: t('June'), value: 5 },
    { label: t('July'), value: 6 },
    { label: t('August'), value: 7 },
    { label: t('September'), value: 8 },
    { label: t('October'), value: 9 },
    { label: t('November'), value: 10 },
    { label: t('December'), value: 11 },
  ];

  // const formValues = control.defaultValuesRef.current;
  const formValues = { ...control.defaultValuesRef.current, ...control.getValues() };
  const defaultValue = formValues[name] instanceof Date ? formValues[name] : new Date(formValues[name]);
  let defaultValueDay;
  let defaultValueMonth;
  let defaultValueYear;

  if (formValues[name]) {
    selectDayValue = defaultValue.getDate();
    selectMonthValue = defaultValue.getMonth();
    selectYearValue = defaultValue.getFullYear();
    defaultValueDay = { label: defaultValue.getDate(), value: defaultValue.getDate() };
    defaultValueMonth = monthOptions.find((option) => option.value === defaultValue.getMonth());
    defaultValueYear = { label: defaultValue.getFullYear(), value: defaultValue.getFullYear() };
  }


  useEffect(() => {
    syncWithInputValue();
  }, []);

  const handleDayChange = (selectedOption: FixMeType) => {
    selectDayValue = selectedOption.value;
    syncWithInputValue();
  };

  const handleMonthChange = (selectedOption: FixMeType) => {
    selectMonthValue = selectedOption.value;
    syncWithInputValue();
  };

  const handleYearChange = (selectedOption: FixMeType) => {
    selectYearValue = selectedOption.value;
    syncWithInputValue();
  };

  return (
    <>
      <label className="font-light block mb-2 text-sm">
        {label}
      </label>
      <div className="flex flex-no-wrap justify-between items-center">
        <div className="w-11/12 flex flex-no-wrap justify-between items-center">
          <div className="w-1/3">
            <ReactSelect
              styles={customStyles}
              placeholder={t('Day')}
              options={dayOptions()}
              value={defaultValueDay}
              onChange={handleDayChange}
            />
          </div>

          <div className="w-1/3 px-2">
            <ReactSelect
              styles={customStyles}
              placeholder={t('Month')}
              options={monthOptions}
              value={defaultValueMonth}
              onChange={handleMonthChange}
            />
          </div>

          <div className="w-1/3">
            <ReactSelect
              styles={customStyles}
              placeholder={t('Year')}
              options={yearOptions()}
              value={defaultValueYear}
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
    </>
  );
};

export default DateSelect;
