import { ApplicationData } from '../../../models/ApplicationData';

export interface LeadApplicationStateInterface {
  step: number;
  data: ApplicationData;
}
