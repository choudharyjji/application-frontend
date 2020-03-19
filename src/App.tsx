import React, { ReactElement, Suspense } from 'react';
import ApplicationPage from './pages/application/ApplicationPage';

const App = (): ReactElement => (
  <div className="container px-2 md:px-64 xl:px-64  box-border">
    <Suspense fallback="loading">
      <ApplicationPage />
    </Suspense>
  </div>
);

export default App;
