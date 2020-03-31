import React, { ReactElement, useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

const ApplicationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const applicationData: ApplicationData = {};
    applicationData.period = 31;
    applicationData.amount = 300;
    applicationData.affiliateReference = localStorage.getItem('affiliateReference') || undefined;
    applicationData.affiliateReferenceSubId = localStorage.getItem('affiliateReferenceSubId') || undefined;
    applicationData.affiliateReferenceTransactionId = localStorage.getItem('affiliateReferenceTransactionId') || undefined;
    dispatch(LeadApplicationActions.updateApplicationData<ApplicationData>(applicationData));
  }, []);


  // if (step === 0 && location.pathname !== '/application/personal-details') {
  //   return (<Redirect to="/application/personal-details" />);
  // }
  // if (step === 1 && location.pathname !== '/application/contact-details') {
  //   return (<Redirect to="/application/contact-details" />);
  // }
  // if (step === 2 && location.pathname !== '/application/income-details') {
  //   return (<Redirect to="/application/income-details" />);
  // }
  // if (step === 3 && location.pathname !== '/application/checking') {
  //   return (<Redirect to="/application/checking" />);
  // }

  return (
    <div className="container max-w-form">
      <Steps step={0}>
        <Step />
        <Step />
        <Step />
      </Steps>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/application/personal-details" />
          </Route>
          <Route path="/application/personal-details">
            <PersonalDetailsPage />
          </Route>
          <Route path="/application/contact-details">
            <ContactDetailsPage />
          </Route>
          <Route path="/application/income-details">
            <IncomeDetailsPage />
          </Route>
          <Route path="/application/checking">
            <CheckingPage />
          </Route>
          <Route path="/application/instantor">
            <InstantorPage />
          </Route>
          <Route path="/application/employment-details">
            <EmploymentDetailsPage />
          </Route>
          <Route path="/application/mobile-verification">
            <MobileVerificationPage />
          </Route>
          <Route path="/application/accepted">
            <AcceptedPage />
          </Route>
          <Route path="/application/declined">
            <RejectedPage />
          </Route>
          <Route path="/application/continue/:id">
            <ContinuePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default ApplicationPage;
