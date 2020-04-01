import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ApplicationData } from '../../models/ApplicationData';
import personalDetailsForm from '../../config/forms/personal-details.form';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationStepResponse } from '../../dto/response/LeadApplicationStepResponse';

const PersonalDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = (formData: ApplicationData): void => {
    const applicationData = { ...formData, ...currentApplicationData };
    dispatch(LeadApplicationActions.updateApplicationData(applicationData));
    axios.put<LeadApplicationStepResponse>('http://api.localhost:7515/lead/step', applicationData).then(({ data }) => {
      applicationData.id = data.id;
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));
      history.push('/application/contact-details');
    });
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold text-fiesta-dark-blue mb-5 xl:text-4xl">
        {t('Personal information')}
      </h2>
      <DynamicForm
        form={personalDetailsForm}
        defaultValues={currentApplicationData}
        onSubmit={(data: any) => onSubmit(data)}
      />
    </>
  );
};

export default PersonalDetailsPage;
