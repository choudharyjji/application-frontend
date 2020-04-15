import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import environment from 'environment';
import { useHistory } from 'react-router-dom';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import contactDetailsForm from '../../config/forms/contact-details.form';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import { RootStateInterface } from '../../state/root-state.interface';
import { FixMeType } from '../../type/fix-me.type';
import { LeadApplicationStepResponse } from '../../dto/response/LeadApplicationStepResponse';
import HttpModule from '../../services/api/HttpModule';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import Steps from '../../modules/steps/Steps';
import Step from '../../modules/steps/Step';
import AppRoute from '../../config/route/AppRoute';
import Button from '../../components/button/Button';

const ContactDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData } = currentState;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = (formData: ApplicationData): void => {
    formData.street = formData.streetOther ? formData.streetOther : formData.street;
    const applicationData = { ...formData, ...currentApplicationData };
    HttpModule.put<LeadApplicationStepResponse>(environment.api.leadCreateStep, applicationData).then(({ data }) => {
      applicationData.id = data.id;
      dispatch(LeadApplicationActions.updateApplicationData(applicationData));
      dispatch(LeadApplicationActions.updateApplicationProgressState<ApplicationProgressStateEnum>(ApplicationProgressStateEnum.INCOME_DETAILS));
      history.push(AppRoute.application.incomeDetails);
    });
  };

  const handlePreviousButton = (): void => {
    history.goBack();
  };

  return (
    <>
      <Steps step={1}>
        <Step />
        <Step />
        <Step />
      </Steps>
      <h2 className="text-3xl font-extrabold text-fiesta-dark-blue mb-5 xl:text-4xl">
        {t('Contact information')}
      </h2>
      <DynamicForm
        form={contactDetailsForm}
        defaultValues={currentApplicationData}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
        buttonGroup={(
          <>
            <Button label={t('Next')} type="submit" color="blue" />
            <Button label={t('Previous')} type="button" onClick={handlePreviousButton} />
          </>
        )}
      />
    </>
  );
};

export default ContactDetailsPage;
