import * as yup from 'yup';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/Form';

const formSchema: FormSchema = {
  fields: [
    {
      name: 'code',
      label: 'Code',
      type: FieldType.TEXT,
      validation: yup.string().required(),
    },
  ],
};

const mobileVerificationForm = new Form(formSchema);

export default mobileVerificationForm;
