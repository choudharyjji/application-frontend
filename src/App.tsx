import React, { ReactElement, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import PageRoutes from './pages/PageRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = (): ReactElement => (
  <div className="container px-2 md:px-64 xl:px-64 mb-10 box-border">
    <Suspense fallback="loading">
      <ToastContainer />
      <PageRoutes />
    </Suspense>
  </div>
);
export default App;
