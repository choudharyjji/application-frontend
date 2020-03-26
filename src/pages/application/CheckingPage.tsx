import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { LeadStatus } from '../../enum/LeadStatus';
import { LeadApplicationStatusResponse } from '../../dto/response/LeadApplicationStatusResponse';

const CheckingPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentApplicationData.id) {
        axios.get<LeadApplicationStatusResponse>(`http://api.localhost:7515/lead/status/${currentApplicationData.id}`).then(({ data }) => {
          dispatch(LeadApplicationActions.updateApplicationResult(data));

          if (data.mobileVerificationRequired === true) {
            history.push('application/mobile-verification');
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
    <>
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl">
        Please Wait!
      </h2>
    </>
  );
};

export default CheckingPage;
