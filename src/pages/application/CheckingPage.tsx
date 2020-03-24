import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { RootStateInterface } from '../../state/root-state.interface';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationResult } from '../../models/ApplicationResult';
import { LeadStatus } from '../../enum/LeadStatus';

const CheckingPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.data;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentApplicationData.id) {
        axios.get(`http://api.localhost:7515/lead/status/${currentApplicationData.id}`).then((response) => {
          const result: ApplicationResult = response.data;
          dispatch(LeadApplicationActions.saveApplicationResult(result));

          if (result.mobileVerificationRequired === true) {
            history.push('application/mobile-verification');
          }
          if (result.status === LeadStatus.ACCEPTED) {
            history.push('/application/accepted');
          }
          if (result.status === LeadStatus.REJECTED) {
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
