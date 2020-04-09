export interface Environment {
  api: {
    leadCreate: string;
    leadCreateStep: string;
    leadCheckStatus: string;
    postCodeLookup: string;
    leadContinue: string;
    customerConsents: string;
    leadSetEmploymentDetails: string;
    leadSetPassword: string;
    leadMobileVerification: string;
    affiliateEvent: string;
  };
  isProduction: boolean;
  isDevelopment: boolean;
  locale: string;
}

export default (baseUrl: string): Environment => ({
  api: {
    leadCreate: `${baseUrl}/lead`,
    leadCreateStep: `${baseUrl}/lead/step`,
    leadCheckStatus: `${baseUrl}/lead/status/{id}`,
    postCodeLookup: `${baseUrl}/postcode/lookup/{code}`,
    leadContinue: `${baseUrl}/lead/url/{id}`,
    customerConsents: `${baseUrl}/customer/{id}/consents`,
    leadSetEmploymentDetails: `${baseUrl}/lead/employment-details`,
    leadSetPassword: `${baseUrl}/lead/customer/password`,
    leadMobileVerification: `${baseUrl}/lead/mobile/verification`,
    affiliateEvent: `${baseUrl}/affiliate/event`,
  },
  isProduction: false,
  isDevelopment: false,
  locale: 'es',
});
