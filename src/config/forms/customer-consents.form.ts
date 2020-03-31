import * as yup from 'yup';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/Form';

const formSchema: FormSchema = {
  fields: [
    {
      name: 'consentEmail',
      label: 'Email',
      type: FieldType.CHECKBOX,
      validation: yup.boolean().oneOf([true, false]).required(),
    },
    {
      name: 'consentText',
      label: 'Text',
      type: FieldType.CHECKBOX,
      validation: yup.boolean().oneOf([true, false]).required(),
    },
    {
      name: 'consentPhone',
      label: 'Phone',
      type: FieldType.CHECKBOX,
      validation: yup.boolean().oneOf([true, false]).required(),
    },
    {
      name: 'consentPost',
      label: 'Post',
      type: FieldType.CHECKBOX,
      validation: yup.boolean().oneOf([true, false]).required(),
    },
  ],
};

const customerConsentsForm = new Form(formSchema);

export default customerConsentsForm;
