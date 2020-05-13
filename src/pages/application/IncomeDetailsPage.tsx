import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import environment from 'environment';
import { useHistory } from 'react-router-dom';
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
import Button from '../../components/button/Button';
import useApplicationProgressGuardHook from '../../hooks/ApplicationProgressGuardHook';
import useApplicationProgressBackButtonHook from '../../hooks/ApplicationProgressBackButtonHook';

const IncomeDetailsPage = (): ReactElement => {
  useApplicationProgressBackButtonHook();
  useApplicationProgressGuardHook(ApplicationProgressStateEnum.INCOME_DETAILS);

  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData } = currentState;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = (formData: ApplicationData): void => {
    formData.iban = `ES${formData.iban}`;
    const applicationData = { ...currentApplicationData, ...formData };
    HttpModule.post<LeadApplicationStepResponse>(environment.api.leadCreate, applicationData).then(() => {
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));
      dispatch(LeadApplicationActions.pushApplicationProgressState<ApplicationProgressStateEnum>(ApplicationProgressStateEnum.CHECKING));
      history.push(AppRoute.application.checking);
    });
  };

  const handlePreviousButton = (): void => {
    dispatch(LeadApplicationActions.popApplicationProgressState());
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
        buttonGroup={(
          <>
            <Button label={t('Apply now')} type="submit" color="blue" />
            <Button label={t('Previous')} type="button" onClick={handlePreviousButton} />
          </>
        )}
      />
    </>
  );
};

export default IncomeDetailsPage;
