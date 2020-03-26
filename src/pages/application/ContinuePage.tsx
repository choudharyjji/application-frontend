import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { LeadApplicationStatusResponse } from '../../dto/response/LeadApplicationStatusResponse';

const ContinuePage = (): ReactElement => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      axios.get<LeadApplicationStatusResponse>(`http://api.localhost:7515/lead/access/${id}`).then(({ data }) => {
        dispatch(LeadApplicationActions.updateApplicationData(data));
        history.push('/application');
      });
    }
  }, []);

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl">
        Please Wait!
      </h2>
    </>
  );
};

export default ContinuePage;
