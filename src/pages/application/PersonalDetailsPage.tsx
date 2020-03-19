import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ApplicationData } from '../../models/ApplicationData';
import personalDetailsForm from '../../config/forms/personal-details.form';
import DynamicForm from '../../dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';

const PersonalDetailsPage = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: ApplicationData): void => {
    dispatch(LeadApplicationActions.moveNextStep(data));
    history.push('/application/contact-details');
  };

  const prevStep = (): void => {
    // history.goBack();
  };
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl">
        Personal Information
      </h2>
      <DynamicForm
        form={personalDetailsForm}
        onSubmit={(data: any) => onSubmit(data)}
      />
    </>
  );
};

export default PersonalDetailsPage;
