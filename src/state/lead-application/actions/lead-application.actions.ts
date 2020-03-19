import { LeadApplicationActionInterface } from '../interface';
import { LeadApplicationActionEnum } from '../enum';
import { ApplicationData } from '../../../models/ApplicationData';

export class LeadApplicationActions {
  public static moveNextStep(data: ApplicationData): LeadApplicationActionInterface {
    return {
      type: LeadApplicationActionEnum.NEXT_STEP,
      payload: {
        data,
      },
    };
  }

  // public static movePreviousStep(): LeadApplicationActionInterface {
  //   return {
  //     type: LeadApplicationActionEnum.PREVIOUS_STEP,
  //   };
  // }
}
