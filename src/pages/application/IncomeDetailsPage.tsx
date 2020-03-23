import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import incomeDetailsForm from '../../config/forms/income-details.form';
import { RootStateInterface } from '../../state/root-state.interface';

const IncomeDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.data;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: ApplicationData): void => {
    const applicationData = { ...data, ...currentApplicationData };
    axios.post('http://api.localhost:7515/lead', applicationData).then((response) => {
      dispatch(LeadApplicationActions.moveNextStep(applicationData));
      history.push('/application/wait');
    });
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
