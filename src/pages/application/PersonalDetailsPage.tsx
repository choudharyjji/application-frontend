import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import environment from 'environment';
import { ApplicationData } from '../../models/ApplicationData';
import personalDetailsForm from '../../config/forms/personal-details.form';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationStepResponse } from '../../dto/response/LeadApplicationStepResponse';
import HttpModule from '../../services/api/HttpModule';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import AppRoute from '../../config/route/AppRoute';
import { LeadApplicationProgressState } from '../../state/lead-application/interface';

const PersonalDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData, progressState: currentProgress } = currentState;
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = (formData: ApplicationData): void => {
    const applicationData = { ...formData, ...currentApplicationData };
    dispatch(LeadApplicationActions.updateApplicationData(applicationData));
    HttpModule.put<LeadApplicationStepResponse>(environment.api.leadCreateStep, applicationData).then(({ data }) => {
      applicationData.id = data.id;
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));

      currentProgress.state = ApplicationProgressStateEnum.CONTACT_DETAILS;
      currentProgress.route = AppRoute.application.contactDetails;
      dispatch(LeadApplicationActions.updateApplicationProgressState<LeadApplicationProgressState>(currentProgress));

      // history.push('/application/contact-details');
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
