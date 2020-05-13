import { LeadApplicationActionEnum } from '../enum';

export interface ApplicationDataUpdateAction<T> {
  type: LeadApplicationActionEnum;
  payload: T | null;
}
