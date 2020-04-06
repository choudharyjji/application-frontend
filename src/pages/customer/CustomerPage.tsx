import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import CustomerConsetsPage from './CustomerConsentsPage';
import AppRoute from '../../config/route/AppRoute';

const CustomerPage = (): ReactElement => (
  <div className="container max-w-form">
    <Router>
      <Switch>
        <Route path={AppRoute.customer.consent}>
          <CustomerConsetsPage />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default CustomerPage;
