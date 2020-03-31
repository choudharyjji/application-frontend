import { ApplicationData } from '../../../models/ApplicationData';
import { ApplicationResult } from '../../../models/ApplicationResult';
import { LeadApplicationProgressState } from './LeadApplicationProgressState';
import { CustomerConsentsResponse } from '../../../dto/response/CustomerConsentsResponse';

export interface LeadApplicationState {
  progressState: LeadApplicationProgressState;
  applicationData: ApplicationData;
  applicationResult: ApplicationResult;
  customerConsents: Partial<CustomerConsentsResponse>;
}
