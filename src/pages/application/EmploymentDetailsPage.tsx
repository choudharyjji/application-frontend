import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import environment from 'environment';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { RootStateInterface } from '../../state/root-state.interface';
import { FixMeType } from '../../type/fix-me.type';
import { EmploymentDetailsRequest } from '../../dto/request/EmploymentDetailsRequest';
import employmentDetailsForm from '../../config/forms/employment-details.form';
import HttpModule from '../../services/api/HttpModule';
import PageHeading from '../../components/pageHeading/PageHeading';
import PageDescription from '../../components/pageDescription/PageDescription';
import AppRoute from '../../config/route/AppRoute';
import useApplicationProgressGuardHook from '../../hooks/ApplicationProgressGuardHook';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import { LeadApplicationActions } from '../../state/lead-application/actions';

const EmploymentDetailsPage = (): ReactElement => {
  useApplicationProgressGuardHook(ApplicationProgressStateEnum.EMPLOYMENT_DETAILS);

  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = (data: FixMeType): void => {
    if (currentApplicationData.id) {
      const requestData: EmploymentDetailsRequest = {
        globalId: currentApplicationData.id,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        workPhone: data.workPhone,
      };
      HttpModule.post(environment.api.leadSetEmploymentDetails, requestData).then(() => {
        dispatch(LeadApplicationActions.pushApplicationProgressState<ApplicationProgressStateEnum>(ApplicationProgressStateEnum.CHECKING));
        history.push(AppRoute.application.checking);
      });
    }
  };

  return (
    <div className="mt-48">
      <div className="mb-10">
        <PageHeading value={t('Please complete your employment details.')} />
        <PageDescription value={t('These details will help us to find best loan for you.')} />
      </div>
      <DynamicForm
        form={employmentDetailsForm}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
        buttonTitle={t('Submit')}
      />
    </div>
  );
};

export default EmploymentDetailsPage;
