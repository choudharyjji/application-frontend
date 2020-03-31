import * as yup from 'yup';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/Form';

const formSchema: FormSchema = {
  fields: [
    {
      name: 'companyName',
      label: 'Company Name',
      type: FieldType.TEXT,
      validation: yup.string().required(),
    }, {
      name: 'jobTitle',
      label: 'Job Title',
      type: FieldType.TEXT,
      validation: yup.string().required(),
    }, {
      name: 'workPhone',
      label: 'Work Phone',
      type: FieldType.TEXT,
      validation: yup.string().matches(/^(6[0-9]{8})$|(7[1-4][0-9]{7})$/).required(),
    },
  ],
};

const employmentDetailsForm = new Form(formSchema);

export default employmentDetailsForm;
