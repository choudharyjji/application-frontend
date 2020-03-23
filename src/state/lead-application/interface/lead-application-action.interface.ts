import { LeadApplicationActionEnum } from '../enum';
import { ApplicationData } from '../../../models/ApplicationData';
import { ApplicationResult } from '../../../models/ApplicationResult';

export interface LeadApplicationActionInterface {
  type: LeadApplicationActionEnum;
  payload: { data: ApplicationData | ApplicationResult };
}
