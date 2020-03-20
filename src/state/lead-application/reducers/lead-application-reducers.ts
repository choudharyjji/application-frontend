import { LeadApplicationStateInterface, LeadApplicationActionInterface } from '../interface';
import { LeadApplicationActionEnum } from '../enum';
import { ApplicationData } from '../../../models/ApplicationData';

const initialState: LeadApplicationStateInterface = {
  step: 0,
  data: {
    amount: 300,
    period: 15,
  },
};

export function leadApplicationReducer(
  state = initialState,
  action: LeadApplicationActionInterface,
): LeadApplicationStateInterface {
  switch (action.type) {
    case LeadApplicationActionEnum.NEXT_STEP:
      return {
        ...state,
        step: state.step + 1,
        data: { ...state.data, ...action.payload.data },
      };
    default:
      return state;
  }
}
