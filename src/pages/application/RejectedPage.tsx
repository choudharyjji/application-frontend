import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeading from '../../components/pageHeading/PageHeading';
import useApplicationProgressGuardHook from '../../hooks/ApplicationProgressGuardHook';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';

const RejectedPage = (): ReactElement => {
  useApplicationProgressGuardHook(ApplicationProgressStateEnum.REJECTED);
  const { t } = useTranslation();
  return (
    <div className="mt-48">
      <PageHeading value={t('Your loan application was declined')} />
    </div>
  );
};

export default RejectedPage;
