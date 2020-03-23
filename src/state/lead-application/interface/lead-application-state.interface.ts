import { ApplicationData } from '../../../models/ApplicationData';
import { ApplicationResult } from '../../../models/ApplicationResult';

export interface LeadApplicationStateInterface {
  step: number;
  data: ApplicationData;
  result: ApplicationResult;
}
