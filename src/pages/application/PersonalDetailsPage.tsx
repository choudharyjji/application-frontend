import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import environment from 'environment';
import { ApplicationData } from '../../models/ApplicationData';
import personalDetailsForm from '../../config/forms/personal-details.form';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationStepResponse } from '../../dto/response/LeadApplicationStepResponse';
import HttpModule from '../../services/api/HttpModule';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import Steps from '../../modules/steps/Steps';
import Step from '../../modules/steps/Step';
import AppRoute from '../../config/route/AppRoute';
import useApplicationProgressGuardHook from '../../hooks/ApplicationProgressGuardHook';

const PersonalDetailsPage = (): ReactElement => {
  useApplicationProgressGuardHook(ApplicationProgressStateEnum.PERSONAL_DETAILS);
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData } = currentState;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = (formData: ApplicationData): void => {
    const applicationData = { ...currentApplicationData, ...formData };
    dispatch(LeadApplicationActions.updateApplicationData(applicationData));
    HttpModule.put<LeadApplicationStepResponse>(environment.api.leadCreateStep, applicationData).then(({ data }) => {
      applicationData.id = data.id;
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));
      dispatch(LeadApplicationActions.pushApplicationProgressState<ApplicationProgressStateEnum>(ApplicationProgressStateEnum.CONTACT_DETAILS));
      history.push(AppRoute.application.contactDetails);
    });
  };


  return (
    <>
      <Steps step={0}>
        <Step />
        <Step />
        <Step />
      </Steps>
      <h2 className="text-3xl font-extrabold text-fiesta-dark-blue mb-5 xl:text-4xl">
        {t('Personal information')}
      </h2>
      <DynamicForm
        form={personalDetailsForm}
        defaultValues={currentApplicationData}
        onSubmit={(data: any) => onSubmit(data)}
        buttonTitle={t('Next')}
      />
    </>
  );
};

export default PersonalDetailsPage;
