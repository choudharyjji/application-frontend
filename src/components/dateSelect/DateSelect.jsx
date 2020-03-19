import React from 'react';
import { default as BaseSelect } from 'react-select';

const DateSelect = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div className="my-6">
      <BaseSelect options={options} />
    </div>
  );
};

export default DateSelect;
