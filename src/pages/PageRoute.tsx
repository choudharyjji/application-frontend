import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationPage from './application/ApplicationPage';
import CustomerPage from './customer/CustomerPage';

const PageRoutes = (): ReactElement => (
  <Router>
    <Switch>
      <Route path="/application">
        <ApplicationPage />
      </Route>
      <Route path="/customer">
        <CustomerPage />
      </Route>
    </Switch>
  </Router>
);


export default PageRoutes;
