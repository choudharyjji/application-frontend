import * as yup from 'yup';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/Form';

const formSchema: FormSchema = {
  fields: [
    {
      type: FieldType.TEXT,
      name: 'companyName',
      label: 'Company Name',
      helperMessage: 'Enter the company name',
      validation: yup.string()
        .matches(/^[^0-9]+$/, { message: 'Please fill in valid company name' })
        .required('Please fill in company name'),
    }, {
      type: FieldType.TEXT,
      name: 'jobTitle',
      label: 'Job Title',
      helperMessage: 'Enter the job title',
      validation: yup.string()
        .matches(/^[^0-9]+$/, { message: 'Please fill in valid job title' })
        .required('Please fill in job title'),
    }, {
      type: FieldType.TEXT,
      name: 'workPhone',
      label: 'Work Phone',
      helperMessage: 'Enter the contact number of company',
      validation: yup.string()
        .matches(/^(6[0-9]{8})$|(7[1-4][0-9]{7})$/, { message: 'Please fill in valid phone number. Please use format 6|7xxxxxxxx' })
        .required('Please fill in work phone'),
    },
  ],
};

const employmentDetailsForm = new Form(formSchema);

export default employmentDetailsForm;
