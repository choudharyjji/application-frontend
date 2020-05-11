import React, { ReactElement, useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch, useLocation, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRoute from '../../config/route/AppRoute';
import { RootStateInterface } from '../../state/root-state.interface';
import ContactDetailsPage from './ContactDetailsPage';
import IncomeDetailsPage from './IncomeDetailsPage';
import PersonalDetailsPage from './PersonalDetailsPage';
import MobileVerificationPage from './MobileVerificationPage';
import AcceptedPage from './AcceptedPage';
import CheckingPage from './CheckingPage';
import RejectedPage from './RejectedPage';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { ApplicationData } from '../../models/ApplicationData';
import ContinuePage from './ContinuePage';
import InstantorPage from './InstantorPage';
import EmploymentDetailsPage from './EmploymentDetailsPage';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';

const ApplicationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { applicationData: currentApplicationData, progressState: currentApplicationProgress } = currentState;
  const [activeProgressState] = currentApplicationProgress.slice(-1);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

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
    const applicationData: ApplicationData = currentApplicationData || { period: 31, amount: 300 };

    applicationData.affiliateReference = localStorage.getItem('affiliateReference') || undefined;
    applicationData.affiliateReferenceSubId = localStorage.getItem('affiliateReferenceSubId') || undefined;
    applicationData.affiliateReferenceTransactionId = localStorage.getItem('affiliateReferenceTransactionId') || undefined;
    dispatch(LeadApplicationActions.updateApplicationData<ApplicationData>(applicationData));

    if (!activeProgressState) {
      dispatch(LeadApplicationActions.updateApplicationProgressState<ApplicationProgressStateEnum>(ApplicationProgressStateEnum.PERSONAL_DETAILS));
    }

    return () => {
      history.block();
      history.listen((listener, action) => {
        if (action === 'POP') {
          console.log('POP');
        }
      });
    };
  }, [history]);


  return (
    <div className="container max-w-form">
      <Router>
        <Switch>
          <Route exact path={AppRoute.application.index}>
            <Redirect to={AppRoute.application.personalDetails} />
          </Route>
          <Route path={AppRoute.application.personalDetails}>
            <PersonalDetailsPage />
          </Route>
          <Route path={AppRoute.application.contactDetails}>
            <ContactDetailsPage />
          </Route>
          <Route path={AppRoute.application.incomeDetails}>
            <IncomeDetailsPage />
          </Route>
          <Route path={AppRoute.application.checking}>
            <CheckingPage />
          </Route>
          <Route path={AppRoute.application.instantor}>
            <InstantorPage />
          </Route>
          <Route path={AppRoute.application.employmentDetails}>
            <EmploymentDetailsPage />
          </Route>
          <Route path={AppRoute.application.mobileVerification}>
            <MobileVerificationPage />
          </Route>
          <Route path={AppRoute.application.accepted}>
            <AcceptedPage />
          </Route>
          <Route path={AppRoute.application.rejected}>
            <RejectedPage />
          </Route>
          <Route path={AppRoute.application.continue}>
            <ContinuePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default ApplicationPage;
