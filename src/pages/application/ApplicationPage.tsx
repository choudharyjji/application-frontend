import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const ApplicationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { step } = currentState;
  const location = useLocation();

  console.log(currentState);

  if (step === 0 && location.pathname !== '/application/personal-details') {
    return (<Redirect to="/application/personal-details" />);
  }
  if (step === 1 && location.pathname !== '/application/contact-details') {
    return (<Redirect to="/application/contact-details" />);
  }
  if (step === 2 && location.pathname !== '/application/income-details') {
    return (<Redirect to="/application/income-details" />);
  }
  if (step === 3 && location.pathname !== '/application/checking') {
    return (<Redirect to="/application/checking" />);
  }

  return (
    <div className="container max-w-form">
      <Steps step={step}>
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
          <Route path="/application/mobile-verification">
            <MobileVerificationPage />
          </Route>
          <Route path="/application/checking">
            <CheckingPage />
          </Route>
          <Route path="/application/accepted">
            <AcceptedPage />
          </Route>
          <Route path="/application/declined">
            <RejectedPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default ApplicationPage;
