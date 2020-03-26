import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import contactDetailsForm from '../../config/forms/contact-details.form';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import { RootStateInterface } from '../../state/root-state.interface';
import { FixMeType } from '../../type/fix-me.type';
import { LeadApplicationStepResponse } from '../../dto/response/LeadApplicationStepResponse';

const ContactDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (formData: ApplicationData): void => {
    const applicationData = { ...formData, ...currentApplicationData };
    axios.put<LeadApplicationStepResponse>('http://api.localhost:7515/lead/step', applicationData).then(({ data }) => {
      applicationData.id = data.id;
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));
      history.push('/application/income-details');
    });
  };
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl">
        Contact Details
      </h2>
      <DynamicForm
        form={contactDetailsForm}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
      />
    </>
  );
};

export default ContactDetailsPage;
