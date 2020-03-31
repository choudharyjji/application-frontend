import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import CustomerConsetsPage from './CustomerConsentsPage';

const CustomerPage = (): ReactElement => (
  <div className="container max-w-form">
    <Router>
      <Switch>
        <Route path="/customer/:id/consents">
          <CustomerConsetsPage />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default CustomerPage;
