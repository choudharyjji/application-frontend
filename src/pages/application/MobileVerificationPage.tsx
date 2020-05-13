import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';
import { useHistory } from 'react-router-dom';
import AppRoute from '../../config/route/AppRoute';
import { toast } from 'react-toastify';
import i18n from '../../i18n';


const MobileVerificationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData, progressState: currentApplicationProgress } = currentState;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (currentApplicationProgress[currentApplicationProgress.length - 1] !== ApplicationProgressStateEnum.MOBILE_VERIFICATION) {
      history.replace(AppRoute.application.index);
    }
  }, []);

  const onSubmit = (data: FixMeType): void => {
    if (currentApplicationData.id) {
      const requestData: MobileVerificationRequest = {
        globalId: currentApplicationData.id,
        verificationCode: data.code,
      };
      HttpModule.post(environment.api.leadMobileVerification, requestData).then(() => {
        dispatch(LeadApplicationActions.updateApplicationProgressState<ApplicationProgressStateEnum>(ApplicationProgressStateEnum.CHECKING));
        history.push(AppRoute.application.checking);
      }, () => {
        toast.error(i18n.t('Verification code is incorrect! Please, try again!'));
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
