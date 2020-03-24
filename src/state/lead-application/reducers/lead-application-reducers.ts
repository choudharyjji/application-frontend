import { LeadApplicationStateInterface, LeadApplicationActionInterface } from '../interface';
import { LeadApplicationActionEnum } from '../enum';

const initialState: LeadApplicationStateInterface = {
  step: 0,
  data: {
    amount: 300,
    period: 15,
  },
  result: {
    partner: {
      title: 'CCLOAN',
      logo: 'https://fiesta-public.s3-eu-west-1.amazonaws.com/partners/logo-ccloan.png',
    },
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
    case LeadApplicationActionEnum.SUBMIT:
      return {
        ...state,
        step: state.step + 1,
        result: { ...state.result, ...action.payload.data },
      };
    default:
      return state;
  }
}
