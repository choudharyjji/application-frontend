import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DynamicForm from '../../lib/dynamic-form/DynamicForm';
import { RootStateInterface } from '../../state/root-state.interface';
import { FixMeType } from '../../type/fix-me.type';
import { EmploymentDetailsRequest } from '../../dto/request/EmploymentDetailsRequest';
import employmentDetailsForm from '../../config/forms/employment-details.form';

const EmploymentDetailsPage = (): ReactElement => {
  const currentState = useSelector((state: RootStateInterface) => state.leadApplication);
  const currentApplicationData = currentState.applicationData;
  const history = useHistory();
  const onSubmit = (data: FixMeType): void => {
    if (currentApplicationData.id) {
      const requestData: EmploymentDetailsRequest = {
        globalId: currentApplicationData.id,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        workPhone: data.workPhone,
      };
      axios.post('http://api.localhost:7515/lead/employment-details', requestData).then((response) => {
        history.push('/application/checking');
      });
    }
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-fiesta-dark-blue text-3xl font-extrabold mb-5 xl:text-4xl text-center">
          Please complete your employment details.
        </h2>
        <p className="text-center text-fiesta-dark-blue">
          These details will help us to find best loan for you
        </p>
      </div>
      <DynamicForm
        form={employmentDetailsForm}
        onSubmit={(data: FixMeType): void => onSubmit(data)}
      />
    </>
  );
};

export default EmploymentDetailsPage;
