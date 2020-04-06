import React, { ReactElement, useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRoute from '../../config/route/AppRoute';
import Steps from '../../modules/steps/Steps';
import Step from '../../modules/steps/Step';
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
import { LeadApplicationProgressState } from '../../state/lead-application/interface';
import { ApplicationProgressStateEnum } from '../../state/lead-application/enum';

const ApplicationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { progressState: currentApplicationProgress } = currentState;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const applicationData: ApplicationData = {};
    const applicationProgress: LeadApplicationProgressState = {};
    applicationProgress.state = ApplicationProgressStateEnum.PERSONAL_DETAILS;
    applicationProgress.route = AppRoute.application.personalDetails;
    applicationData.period = 31;
    applicationData.amount = 300;
    applicationData.affiliateReference = localStorage.getItem('affiliateReference') || undefined;
    applicationData.affiliateReferenceSubId = localStorage.getItem('affiliateReferenceSubId') || undefined;
    applicationData.affiliateReferenceTransactionId = localStorage.getItem('affiliateReferenceTransactionId') || undefined;
    dispatch(LeadApplicationActions.updateApplicationData<ApplicationData>(applicationData));
    dispatch(LeadApplicationActions.updateApplicationProgressState<LeadApplicationProgressState>(applicationProgress));
  }, []);


  if (currentApplicationProgress
    && currentApplicationProgress.route
    && currentApplicationProgress.route !== location.pathname) {
    return (<Redirect to={currentApplicationProgress.route} />);
  }

  return (
    <div className="container max-w-form">
      <Steps step={0}>
        <Step />
        <Step />
        <Step />
      </Steps>
      <Router>
        <Switch>
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
