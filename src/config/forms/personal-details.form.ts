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
      default: 'John',
      helperMessage: 'The tooltiptext class holds the actual tooltip text. It is hidden by default, and will be visible on hover (see below). We have also added some basic styles to it: 120px width, black background color, white text color, centered text, and 5px top and bottom padding.',
      validation: yup.string().max(50).matches(/^[^0-9]+$/).required(),
      autoFocus: true,
    },
    {
      name: 'lastName',
      type: FieldType.TEXT,
      label: 'Last Name',
      default: 'Smith',
      helperMessage: 'Hello world',
      validation: yup.string().max(50).matches(/^[^0-9]+$/).required(),
    },
    {
      name: 'gender',
      label: 'Gender',
      type: FieldType.SELECT,
      default: Gender.MALE,
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
      validation: yup.date()
        .min(moment().subtract(102, 'years').toDate(), 'Max age is 102')
        .max(moment().subtract(18, 'years').toDate(), 'Min age is 18').required(),
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
