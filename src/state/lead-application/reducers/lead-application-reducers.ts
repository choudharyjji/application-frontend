import { ApplicationDataUpdateAction, LeadApplicationState } from '../interface';
import { LeadApplicationActionEnum } from '../enum';

const initialState: Partial<LeadApplicationState> = {};

export function leadApplicationReducer<T>(
  state = initialState,
  action: ApplicationDataUpdateAction<T>,
): Partial<LeadApplicationState> {
  switch (action.type) {
    case LeadApplicationActionEnum.UPDATE_APPLICATION_DATA:
      return {
        ...state,
        applicationData: { ...state.applicationData, ...action.payload },
      };
    case LeadApplicationActionEnum.UPDATE_APPLICATION_RESULT:
      return {
        ...state,
        applicationResult: { ...state.applicationResult, ...action.payload },
      };
    case LeadApplicationActionEnum.UPDATE_APPLICATION_PROGRESS_STATE:
      return {
        ...state,
        progressState: { ...state.progressState, ...action.payload },
      };
    case LeadApplicationActionEnum.UPDATE_CUSTOMER_CONSENTS:
      return {
        ...state,
        customerConsents: { ...state.customerConsents, ...action.payload },
      };
    default:
      return state;
  }
}
