import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import environment from 'environment';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import incomeDetailsForm from '../../config/forms/income-details.form';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationStepResponse } from '../../dto/response/LeadApplicationStepResponse';
import HttpModule from '../../services/api/HttpModule';
import Steps from '../../modules/steps/Steps';
import Step from '../../modules/steps/Step';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import AppRoute from '../../config/route/AppRoute';
import { LeadApplicationProgressState } from '../../state/lead-application/interface';

const IncomeDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData, progressState: currentProgress } = currentState;
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = (formData: ApplicationData): void => {
    const applicationData = { ...formData, ...currentApplicationData };
    HttpModule.post<LeadApplicationStepResponse>(environment.api.leadCreate, applicationData).then(() => {
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));
      history.push('/application/checking');

      currentProgress.state = ApplicationProgressStateEnum.CHECKING;
      currentProgress.route = AppRoute.application.checking;
      dispatch(LeadApplicationActions.updateApplicationProgressState<LeadApplicationProgressState>(currentProgress));
    });
  };

  return (
    <>
      <Steps step={2}>
        <Step />
        <Step />
        <Step />
      </Steps>
      <h2 className="text-3xl font-extrabold text-fiesta-dark-blue mb-5 xl:text-4xl">
        {t('Job information')}
      </h2>
      <DynamicForm
        form={incomeDetailsForm}
        defaultValues={currentApplicationData}
        onSubmit={(data: any) => onSubmit(data)}
        buttonTitle={t('Apply now')}
      />
    </>
  );
};


export default IncomeDetailsPage;
