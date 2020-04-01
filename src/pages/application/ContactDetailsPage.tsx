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
import { useTranslation } from 'react-i18next';

const ContactDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      <h2 className="text-3xl font-extrabold text-fiesta-dark-blue mb-5 xl:text-4xl">
        {t('Contact information')}
      </h2>
      <DynamicForm
        form={contactDetailsForm}
        defaultValues={currentApplicationData}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
      />
    </>
  );
};

export default ContactDetailsPage;
