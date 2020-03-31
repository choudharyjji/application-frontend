import { LeadApplicationActionEnum } from '../enum';
import { ApplicationDataUpdateAction } from '../interface';

export class LeadApplicationActions {
  public static updateApplicationData<T>(data: T): ApplicationDataUpdateAction<T> {
    return {
      type: LeadApplicationActionEnum.UPDATE_APPLICATION_DATA,
      payload: data,
    };
  }

  public static updateCustomerConsentsData<T>(data: T): ApplicationDataUpdateAction<T> {
    return {
      type: LeadApplicationActionEnum.UPDATE_CUSTOMER_CONSENTS,
      payload: data,
    };
  }

  public static updateApplicationResult<T>(data: T): ApplicationDataUpdateAction<T> {
    return {
      type: LeadApplicationActionEnum.UPDATE_APPLICATION_RESULT,
      payload: data,
    };
  }

  public static updateApplicationProgressState<T>(data: T): ApplicationDataUpdateAction<T> {
    return {
      type: LeadApplicationActionEnum.UPDATE_APPLICATION_PROGRESS_STATE,
      payload: data,
    };
  }
}
