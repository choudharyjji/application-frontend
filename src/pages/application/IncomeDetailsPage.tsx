import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DynamicForm from '../../dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import incomeDetailsForm from '../../config/forms/income-details.form';

const IncomeDetailsPage = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: ApplicationData): void => {
    dispatch(LeadApplicationActions.moveNextStep(data));
    history.push('/application/wait');
  };

  const prevStep = (): void => {
    history.goBack();
  };
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl">
        Income Details
      </h2>
      <DynamicForm
        form={incomeDetailsForm}
        onSubmit={(data: any) => onSubmit(data)}
      />
    </>
  );
};


export default IncomeDetailsPage;
