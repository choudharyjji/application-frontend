import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { LeadStatus } from '../../enum/LeadStatus';
import { LeadApplicationStatusResponse } from '../../dto/response/LeadApplicationStatusResponse';
import Loader from '../../components/loader/Loader';
import { useTranslation } from 'react-i18next';

const CheckingPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentApplicationData.id) {
        axios.get<LeadApplicationStatusResponse>(`http://api.localhost:7515/lead/status/${currentApplicationData.id}`).then(({ data }) => {
          dispatch(LeadApplicationActions.updateApplicationResult(data));

          if (data.employmentDetailsRequired === true) {
            history.push('application/employment-details');
          }
          if (data.mobileVerificationRequired === true) {
            history.push('application/mobile-verification');
          }
          if (data.iframeParams !== null) {
            history.push('application/instantor');
          }
          if (data.status === LeadStatus.ACCEPTED) {
            history.push('/application/accepted');
          }
          if (data.status === LeadStatus.REJECTED || data.status === LeadStatus.ERROR) {
            history.push('/application/rejected');
          }
        });
      }
    }, 3000);
    return (): void => clearInterval(interval);
  });

  return (
    <div className="mt-64">
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl text-center text-fiesta-dark-blue">
        {t('Your loan application accepted. Please wait')}
      </h2>
      <Loader />
    </div>
  );
};

export default CheckingPage;
