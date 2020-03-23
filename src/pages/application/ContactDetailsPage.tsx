import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import contactDetailsForm from '../../config/forms/contact-details.form';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import { RootStateInterface } from '../../state/root-state.interface';

const ContactDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.data;

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: ApplicationData): void => {
    const applicationData = { ...data, ...currentApplicationData };
    axios.put('http://api.localhost:7515/lead/step', applicationData).then((response) => {
      applicationData.id = response.data.id;
      dispatch(LeadApplicationActions.moveNextStep(applicationData));
      history.push('/application/income-details');
    });
  };

  const prevStep = (): void => {
    history.goBack();
  };
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl">
        Contact Details
      </h2>
      <DynamicForm
        form={contactDetailsForm}
        onSubmit={(data: any) => onSubmit(data)}
      />
    </>
  );
};

export default ContactDetailsPage;
