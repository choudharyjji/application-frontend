import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import environment from 'environment';
import { useHistory } from 'react-router-dom';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { LeadStatus } from '../../enum/LeadStatus';
import { LeadApplicationStatusResponse } from '../../dto/response/LeadApplicationStatusResponse';
import Loader from '../../components/loader/Loader';
import HttpModule from '../../services/api/HttpModule';
import PageHeading from '../../components/pageHeading/PageHeading';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import AppRoute from '../../config/route/AppRoute';
import useApplicationProgressGuardHook from '../../hooks/ApplicationProgressGuardHook';

const CheckingPage = (): ReactElement => {
  useApplicationProgressGuardHook(ApplicationProgressStateEnum.CHECKING);

  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentApplicationData.id) {
        const endpoint = HttpModule.parse(environment.api.leadCheckStatus, { id: currentApplicationData.id });
        HttpModule.get<LeadApplicationStatusResponse>(endpoint).then(({ data }) => {
          dispatch(LeadApplicationActions.updateApplicationResult(data));

          let nextState: ApplicationProgressStateEnum | null = null;
          let nextPage: string | null = null;
          if (data.employmentDetailsRequired === true) {
            nextState = ApplicationProgressStateEnum.EMPLOYMENT_DETAILS;
            nextPage = AppRoute.application.employmentDetails;
          } else if (data.mobileVerificationRequired === true) {
            nextState = ApplicationProgressStateEnum.MOBILE_VERIFICATION;
            nextPage = AppRoute.application.mobileVerification;
          } else if (data.status === LeadStatus.ACCEPTED) {
            nextState = ApplicationProgressStateEnum.ACCEPTED;
            nextPage = AppRoute.application.accepted;
          } else if (data.status === LeadStatus.REJECTED || data.status === LeadStatus.ERROR) {
            nextState = ApplicationProgressStateEnum.REJECTED;
            nextPage = AppRoute.application.rejected;
          }

          if (nextState && nextPage) {
            dispatch(LeadApplicationActions.pushApplicationProgressState<ApplicationProgressStateEnum>(nextState));
            history.push(nextPage);
          }
        });
      }
    }, 3000);
    return (): void => clearInterval(interval);
  });

  return (
    <div className="mt-48">
      <PageHeading value={t('Your loan application accepted. Please wait')} />
      <Loader />
    </div>
  );
};

export default CheckingPage;
