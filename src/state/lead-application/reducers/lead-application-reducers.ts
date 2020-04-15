import { ApplicationDataUpdateAction, LeadApplicationState } from '../interface';
import { LeadApplicationActionEnum } from '../enum';

const stateInStorage = sessionStorage.getItem('state');
const stateValueInStorage = stateInStorage ? JSON.parse(stateInStorage) : null;
const initialState: LeadApplicationState = stateValueInStorage || {
  progressState: [],
};

export function leadApplicationReducer<T extends any>(
  state = initialState,
  action: ApplicationDataUpdateAction<T>,
): Partial<LeadApplicationState> {
  let temp;
  switch (action.type) {
    case LeadApplicationActionEnum.UPDATE_APPLICATION_DATA:
      temp = {
        ...state,
        applicationData: { ...state.applicationData, ...action.payload },
      };
      sessionStorage.setItem('state', JSON.stringify(temp));
      return temp;
    case LeadApplicationActionEnum.UPDATE_APPLICATION_RESULT:
      temp = {
        ...state,
        applicationResult: { ...state.applicationResult, ...action.payload },
      };
      sessionStorage.setItem('state', JSON.stringify(temp));
      return temp;
    case LeadApplicationActionEnum.UPDATE_APPLICATION_PROGRESS_STATE:
      temp = {
        ...state,
        progressState: [...state.progressState, action.payload],
      };
      sessionStorage.setItem('state', JSON.stringify(temp));
      return temp;
    case LeadApplicationActionEnum.UPDATE_CUSTOMER_CONSENTS:
      temp = {
        ...state,
        customerConsents: { ...state.customerConsents, ...action.payload },
      };
      sessionStorage.setItem('state', JSON.stringify(temp));
      return temp;
    default:
      return state;
  }

}
