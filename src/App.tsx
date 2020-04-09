import React, { ReactElement, Suspense } from 'react';

import PageRoutes from './pages/PageRoute';

const App = (): ReactElement => (
  <div className="container px-2 md:px-64 xl:px-64 mb-10 box-border">
    <Suspense fallback="loading">
      <PageRoutes />
    </Suspense>
  </div>
);
export default App;
