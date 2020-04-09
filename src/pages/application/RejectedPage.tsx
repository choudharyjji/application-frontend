import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeading from '../../components/pageHeading/PageHeading';

const RejectedPage = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="mt-48">
      <PageHeading value={t('Your loan application was declined')} />
    </div>
  );
};

export default RejectedPage;
