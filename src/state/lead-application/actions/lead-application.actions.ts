import { LeadApplicationActionInterface } from '../interface';
import { LeadApplicationActionEnum } from '../enum';
import { ApplicationData } from '../../../models/ApplicationData';
import { ApplicationResult } from '../../../models/ApplicationResult';

export class LeadApplicationActions {
  public static moveNextStep(data: ApplicationData): LeadApplicationActionInterface {
    return {
      type: LeadApplicationActionEnum.NEXT_STEP,
      payload: {
        data,
      },
    };
  }

  public static saveApplicationResult(data: ApplicationResult): LeadApplicationActionInterface {
    return {
      type: LeadApplicationActionEnum.SUBMIT,
      payload: {
        data,
      },
    };
  }
}
