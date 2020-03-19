import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Steps from '../../modules/steps/Steps';
import Step from '../../modules/steps/Step';
import { RootStateInterface } from '../../state/root-state.interface';
import ContactDetailsPage from './ContactDetailsPage';
import IncomeDetailsPage from './IncomeDetailsPage';
import PersonalDetailsPage from './PersonalDetailsPage';

const ApplicationPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { step } = currentState;

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
        </Switch>
      </Router>
    </div>
  );
};

export default ApplicationPage;
