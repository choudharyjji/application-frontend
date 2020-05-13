import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootStateInterface } from '../state/root-state.interface';
import { ApplicationProgressStateEnum } from '../state/lead-application/enum';
import AppRoute from '../config/route/AppRoute';

const useApplicationProgressGuardHook = (appState: ApplicationProgressStateEnum): void => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const history = useHistory();
  const currentApplicationProgress = currentState.progressState;
  const defaultRoute = AppRoute.application.index;
  const progressRouteMap = [
    {
      state: ApplicationProgressStateEnum.PERSONAL_DETAILS,
      route: AppRoute.application.personalDetails,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.CONTACT_DETAILS,
      route: AppRoute.application.contactDetails,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.INCOME_DETAILS,
      route: AppRoute.application.incomeDetails,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.CHECKING,
      route: AppRoute.application.checking,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.EMPLOYMENT_DETAILS,
      route: AppRoute.application.employmentDetails,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.INSTANTOR,
      route: AppRoute.application.instantor,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.MOBILE_VERIFICATION,
      route: AppRoute.application.mobileVerification,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.ACCEPTED,
      route: AppRoute.application.accepted,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.REJECTED,
      route: AppRoute.application.rejected,
      strict: true,
    },
    {
      state: ApplicationProgressStateEnum.CONTINUE,
      route: AppRoute.application.continue,
      strict: false,
    },
  ];

  useEffect(() => {
    const actualState = currentApplicationProgress[currentApplicationProgress.length - 1];
    if (actualState !== appState) {
      const stateRout = progressRouteMap.find((item) => item.state === actualState);
      const redirectTo = stateRout ? stateRout.route : defaultRoute;
      history.replace(redirectTo);
    }
  }, [appState, currentApplicationProgress, defaultRoute, history, progressRouteMap]);
};

export default useApplicationProgressGuardHook;
