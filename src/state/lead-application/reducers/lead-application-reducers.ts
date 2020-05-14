import { ApplicationDataUpdateAction, LeadApplicationState } from '../interface';
import { LeadApplicationActionEnum } from '../enum';

const stateInStorage = sessionStorage.getItem('state');
const stateValueInStorage = stateInStorage ? JSON.parse(stateInStorage) : null;
const initialState: LeadApplicationState = stateValueInStorage || {
  progressState: [0],
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
    case LeadApplicationActionEnum.PUSH_APPLICATION_PROGRESS_STATE:
      const last = state.progressState[state.progressState.length - 1];
      if (action.payload != null && last !== action.payload) {
        temp = {
          ...state,
          progressState: [...state.progressState, action.payload],
        };
        sessionStorage.setItem('state', JSON.stringify(temp));
        return temp;
      }
      return state;

    case LeadApplicationActionEnum.POP_APPLICATION_PROGRESS_STATE:
      const progressStates = state.progressState;
      progressStates.pop();
      temp = {
        ...state,
        progressState: progressStates,
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
    case LeadApplicationActionEnum.CLEAR_STATE:
      temp = {
        ...state,
        progressState: [0],
        applicationResult: undefined,
      };

      sessionStorage.setItem('state', JSON.stringify(temp));
      return temp;
    default:
      return state;
  }
}
