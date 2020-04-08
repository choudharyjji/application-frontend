import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import environment from 'environment';
import { useTranslation } from 'react-i18next';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { LeadApplicationStatusResponse } from '../../dto/response/LeadApplicationStatusResponse';
import HttpModule from '../../services/api/HttpModule';
import PageHeading from '../../components/pageHeading/PageHeading';
import Loader from '../../components/loader/Loader';

const ContinuePage = (): ReactElement => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const endpoint = HttpModule.parse(environment.api.leadContinue, { id });
      HttpModule.get<LeadApplicationStatusResponse>(endpoint).then(({ data }) => {
        dispatch(LeadApplicationActions.updateApplicationData(data));
        history.push('/application');
      });
    }
  }, []);

  return (
    <div className="mt-48">
      <PageHeading value={t('Your last loan application is getting ready. Please wait.')} />
      <Loader />
    </div>
  );
};

export default ContinuePage;
