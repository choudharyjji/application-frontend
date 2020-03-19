import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootStore from './state/root-store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './css/tailwind.css';
import './i18n';

ReactDOM.render(
  <Provider store={rootStore}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
