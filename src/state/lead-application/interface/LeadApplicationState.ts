import { ApplicationData } from '../../../models/ApplicationData';
import { ApplicationResult } from '../../../models/ApplicationResult';
import { LeadApplicationProgressState } from './LeadApplicationProgressState';

export interface LeadApplicationState {
  progressState: LeadApplicationProgressState;
  applicationData: ApplicationData;
  applicationResult: ApplicationResult;
}
