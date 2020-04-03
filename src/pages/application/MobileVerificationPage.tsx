import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import environment from 'environment';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import mobileVerificationForm from '../../config/forms/mobile-verification.form';
import { RootStateInterface } from '../../state/root-state.interface';
import { MobileVerificationRequest } from '../../dto/request/MobileVerificationRequest';
import { FixMeType } from '../../type/fix-me.type';
import HttpModule from '../../services/api/HttpModule';

const MobileVerificationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
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
    <>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold mb-5 xl:text-4xl text-center">
          Please verify your mobile
        </h2>
        <p className="text-center">
          We have sent a unique verification code via SMS. Please fill in verification
          code.
        </p>
      </div>
      <DynamicForm
        form={mobileVerificationForm}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
      />
    </>
  );
};

export default MobileVerificationPage;
