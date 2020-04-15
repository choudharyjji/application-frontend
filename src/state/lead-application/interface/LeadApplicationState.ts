import { ApplicationData } from '../../../models/ApplicationData';
import { ApplicationResult } from '../../../models/ApplicationResult';
import { CustomerConsentsResponse } from '../../../dto/response/CustomerConsentsResponse';
import { ApplicationProgressStateEnum } from '../enum';

export interface LeadApplicationState {
  progressState: ApplicationProgressStateEnum[];
  applicationData: ApplicationData;
  applicationResult: ApplicationResult;
  customerConsents: Partial<CustomerConsentsResponse>;
}
