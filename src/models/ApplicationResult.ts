import { FixMeType } from '../type/fix-me.type';
import { LeadStatus } from '../enum/LeadStatus';

export interface ApplicationResult {
  status?: LeadStatus;
  amount?: number;
  period?: number;
  mobileVerificationRequired?: boolean;
  passwordSetRequired?: boolean;
  employmentDetailsRequired?: boolean;
  redirectParams?: Record<string, FixMeType>;
  iframeParams?: any;
  redirect?: string;
  partner?: { title: string; logo: string } | null;
}
