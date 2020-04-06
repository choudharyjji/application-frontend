import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { RootStateInterface } from '../../state/root-state.interface';
import { FixMeType } from '../../type/fix-me.type';
import customerConsentsForm from '../../config/forms/customer-consents.form';
import { LeadApplicationStatusResponse } from '../../dto/response/LeadApplicationStatusResponse';
import { LeadApplicationActions } from '../../state/lead-application/actions';
import { CustomerConsentsRequest } from '../../dto/request/CustomerConsentsRequest';

const CustomerConsetsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentCustomerConsents = currentState.customerConsents;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get<LeadApplicationStatusResponse>(`http://api.localhost:7515/customer/${id}/consents`).then(({ data }) => {
        dispatch(LeadApplicationActions.updateCustomerConsentsData(data));
      });
    }
  }, []);

  const onSubmit = (data: FixMeType): void => {
    if (id) {
      const requestData: CustomerConsentsRequest = {
        consentEmail: data.consentEmail,
        consentPhone: data.consentPhone,
        consentPost: data.consentPost,
        consentText: data.consentText,
      };
      axios.post(`http://api.localhost:7515/customer/${id}/consents`, requestData);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-fiesta-dark-blue text-3xl font-extrabold mb-5 xl:text-4xl text-center">
          Marketing Preferences
        </h2>
        <p className="text-center text-fiesta-dark-blue">
          Let us know how we can contact you regarding marketing information such as product updates, promo codes,
          special offers and more.
        </p>
      </div>
      <DynamicForm
        form={customerConsentsForm}
        defaultValues={currentCustomerConsents}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
      />
    </>
  );
};

export default CustomerConsetsPage;
