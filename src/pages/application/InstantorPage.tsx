import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootStateInterface } from '../../state/root-state.interface';
import AppRoute from '../../config/route/AppRoute';

declare const Instantor: any;

const InstantorPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const history = useHistory();

  const onLoad = (event: any) => {
    const instantorId = currentState.applicationResult.iframeParams.instantorId || null;
    const applicationUuid = currentState.applicationResult.iframeParams.applicationUuid || null;
    const firstName = currentState.applicationData.firstName || null;
    const lastName = currentState.applicationData.lastName || null;

    const itor = new Instantor(instantorId);
    itor.userParam('applicationUuid', applicationUuid);
    itor.userParam('firstName', firstName);
    itor.userParam('lastName', lastName);
    itor.load('#itor');

    itor.listener((response: any) => {
      switch (response) {
        case 'process-finished':
          history.push(AppRoute.application.accepted);
          break;
        case 'invalid-login':
          history.push(AppRoute.application.checking);
          break;
        default:
          history.push(AppRoute.application.checking);
          break;
      }
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.instantor.com/es/frame-loader/instantor-0.7.3.min.js';
    script.onload = onLoad;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <div id="itor">
        Please wait...
      </div>
    </>
  );
};

export default InstantorPage;
