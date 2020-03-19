import { LeadApplicationActionEnum } from '../enum';
import { ApplicationData } from '../../../models/ApplicationData';

export interface LeadApplicationActionInterface {
  type: LeadApplicationActionEnum;
  payload: {data: ApplicationData};
}
