import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootStateInterface } from '../../state/root-state.interface';
import Button from '../../components/button/Button';
import logo from '../../assets/img/logo-dark-with-colors@3x.png';
import PageHeading from '../../components/pageHeading/PageHeading';
import PageDescription from '../../components/pageDescription/PageDescription';

const AcceptedPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const { t } = useTranslation();
  const [seconds, updateSeconds] = useState(5);
  const { applicationResult } = currentState;
  const { partner } = applicationResult;
  const partnerLogo = partner?.logo ? partner?.logo : logo;

  const redirect = (): void => {
    if (applicationResult.redirect) {
      window.location.href = applicationResult.redirect;
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds <= 0) {
        redirect();
      } else {
        updateSeconds(seconds - 1);
      }
    }, 1000);
    return (): void => clearInterval(countdown);
  });

  if (!partner) {
    return (<Redirect to="/application/personal-details" />);
  }

  return (
    <div className="mt-48">
      <PageHeading value={t('We have an offer for you!')} />
      <PageDescription value={t('We are redirecting you to {{partner}} in {{seconds}} seconds.', {
        partner: partner?.title,
        seconds,
      })}
      />

      <div className="flex my-10 flex-wrap items-center justify-around ">
        <div className="w-1/3 bg-gray-200 rounded px-2 px-6">
          <img
            className="object-contain h-20 w-full"
            src={logo}
            alt="FiestaCredito"
          />
        </div>
        <div className="w-1/6 flex justify-center">
          <svg
            className="w-10 h-10"
            height="300px"
            width="300px"
            fill="#fdd900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 11"
            x="0px"
            y="0px"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="m.251 10.535c-.335-.352-.335-.922 0-1.273l3.679-3.863-3.679-3.863c-.335-.352-.335-.922 0-1.273.335-.352.878-.352 1.213 0l4.285 4.499c.335.352.335.922 0 1.273l-4.285 4.499c-.167.176-.387.264-.606.264-.219 0-.439-.088-.606-.264"
                fill="#fdd900"
              />
            </g>
          </svg>
        </div>
        <div className="w-1/3 bg-gray-200 rounded px-2 px-6 align-middle flex">
          <img
            className="object-contain h-20 w-full"
            src={partnerLogo}
            alt={partner?.title}
          />
        </div>
      </div>
      <div className="mt-12 mb-2 text-center">
        <Button label={t('SEE OFFER NOW!')} color="yellow" type="button" onClick={redirect} />
      </div>

      <p className="text-center text-sm text-fiesta-dark-blue">
        {t('You just have to answer some more questions at {{partner}} and you will get your loan now!',
          {
            partner: partner?.title,
          })}

      </p>

    </div>
  );
};

export default AcceptedPage;
