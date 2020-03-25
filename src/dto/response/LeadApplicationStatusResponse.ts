import { LeadStatus } from '../../enum/LeadStatus';
import { FixMeType } from '../../type/fix-me.type';

export interface LeadApplicationStatusResponse {
  status: LeadStatus;
  amount: number;
  period: number;
  mobileVerificationRequired: boolean;
  passwordSetRequired: boolean;
  employmentDetailsRequired: boolean;
  redirectParams: Record<string, FixMeType>;
  iframeParams: Record<string, FixMeType>;
  redirect: string;
  partner: { title: string; logo: string } | null;
}
