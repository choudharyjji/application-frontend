import * as yup from 'yup';
import moment from 'moment';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Gender } from '../../enum';
import { Form } from '../../lib/dynamic-form/util/Form';

const formSchema: FormSchema = {
  fields: [
    {
      name: 'firstName',
      type: FieldType.TEXT,
      label: 'First Name',
      validation: yup.string().max(50).matches(/^[^0-9]+$/).required(),
      autoFocus: true,
      tooltip: 'Enter your first name as on ID card',
    },
    {
      name: 'lastName',
      type: FieldType.TEXT,
      label: 'Last Name',
      validation: yup.string().max(50).matches(/^[^0-9]+$/).required(),
    },
    {
      name: 'gender',
      label: 'Gender',
      type: FieldType.SELECT,
      options: [
        {
          label: 'Male',
          value: Gender.MALE,
        },
        {
          label: 'Female',
          value: Gender.FEMALE,
        },
      ],
      validation: yup.string()
        .oneOf([
          Gender.MALE,
          Gender.FEMALE,
        ]).required(),
    },
    {
      name: 'dateOfBirth',
      label: 'Date of birth',
      type: FieldType.DATE,
      dateParams: {
        minDate: moment().subtract(102, 'years').toDate(),
        maxDate: moment().subtract(18, 'years').toDate(),
      },
      // validation: yup.date()
      //   .min(moment().subtract(102, 'years').toDate())
      //   .max(moment().subtract(18, 'years').toDate()).required(),
    },
    {
      name: 'phoneNumber',
      label: 'Mobile number',
      type: FieldType.TEXT,
      validation: yup.string().matches(/^(6[0-9]{8})$|(7[1-4][0-9]{7})$/).required(),
    },
    {
      name: 'email',
      label: 'Email',
      type: FieldType.TEXT,
      validation: yup.string().email().required(),
    },
    {
      name: 'generalPolicies',
      label: 'I confirm that I have read and accept the Terms and Conditions and the Data Processing Policy.',
      type: FieldType.CHECKBOX,
      validation: yup.boolean().oneOf([true]),
    },
    {
      name: 'marketingConsents',
      label: 'I agree to keep up to date with the latest news and receive special offers and discounts by any means, including electronic communications or equivalent from FiestaCredito.',
      type: FieldType.CHECKBOX,
      validation: yup.boolean().oneOf([true, false]),
    },
  ],
};

const personalDetailsForm = new Form(formSchema);

export default personalDetailsForm;
