import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const RejectedPage = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="mt-64">
      <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl text-fiesta-dark-blue text-center">
        {t('Your loan application was declined')}
      </h2>
    </div>
  );
};

export default RejectedPage;
