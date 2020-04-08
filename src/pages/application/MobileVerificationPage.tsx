import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import environment from 'environment';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import mobileVerificationForm from '../../config/forms/mobile-verification.form';
import { RootStateInterface } from '../../state/root-state.interface';
import { MobileVerificationRequest } from '../../dto/request/MobileVerificationRequest';
import { FixMeType } from '../../type/fix-me.type';
import HttpModule from '../../services/api/HttpModule';
import PageHeading from '../../components/pageHeading/PageHeading';
import PageDescription from '../../components/pageDescription/PageDescription';

const MobileVerificationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const { t } = useTranslation();
  const onSubmit = (data: FixMeType): void => {
    if (currentApplicationData.id) {
      const requestData: MobileVerificationRequest = {
        globalId: currentApplicationData.id,
        verificationCode: data.code,
      };
      HttpModule.post(environment.api.leadMobileVerification, requestData).then(() => {
        history.push('/application/checking');
      });
    }
  };

  return (
    <div className="mt-48">
      <div className="mb-10">
        <PageHeading value={t('Please verify your mobile')} />
        <PageDescription
          value={t('We have sent a unique verification code via SMS. Please fill in verification code.')}
        />
      </div>
      <DynamicForm
        form={mobileVerificationForm}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
        buttonTitle={t('Verify')}
      />
    </div>
  );
};

export default MobileVerificationPage;
