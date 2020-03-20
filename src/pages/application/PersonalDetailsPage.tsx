import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ApplicationData } from '../../models/ApplicationData';
import personalDetailsForm from '../../config/forms/personal-details.form';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { RootStateInterface } from '../../state/root-state.interface';

const PersonalDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.data;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data: ApplicationData): void => {
    const applicationData = { ...data, ...currentApplicationData };
    axios.put('http://api.localhost:7515/lead/step', applicationData).then((response) => {
      applicationData.id = response.data.id;
      dispatch(LeadApplicationActions.moveNextStep(applicationData));
      history.push('/application/contact-details');
    });
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
