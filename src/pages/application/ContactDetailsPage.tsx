import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DynamicForm from '../../dynamic-form/DynamicForm';
import contactDetailsForm from '../../config/forms/contact-details.form';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';

const ContactDetailsPage = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: ApplicationData): void => {
    dispatch(LeadApplicationActions.moveNextStep(data));
    history.push('/application/income-details');
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
