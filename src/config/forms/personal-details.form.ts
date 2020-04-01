import * as yup from 'yup';
import moment from 'moment';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Gender } from '../../enum';
import { Form } from '../../lib/dynamic-form/util/Form';

const formSchema: FormSchema = {
  fields: [
    {
      type: FieldType.TEXT,
      name: 'firstName',
      label: 'First Name',
      helperMessage: 'Enter your first name as on ID card',
      validation: yup.string()
        .max(50, 'First name can\'t be longer than 50 symbols')
        .matches(/^[^0-9]+$/, { message: 'Please fill in valid first name' })
        .required('Please fill in your first name'),
    },
    {
      type: FieldType.TEXT,
      name: 'lastName',
      label: 'Last Name',
      helperMessage: 'Enter your last name as on ID card',
      validation: yup.string()
        .max(50, 'First last can\'t be longer than 50 symbols')
        .matches(/^[^0-9]+$/, { message: 'Please fill in valid last name' })
        .required('Please fill in your last name'),
    },
    {
      type: FieldType.SELECT,
      name: 'gender',
      label: 'Gender',
      helperMessage: 'Select your gender',
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
      validation: yup.string().required('Please select your gender'),
    },
    {
      type: FieldType.DATE,
      name: 'dateOfBirth',
      label: 'Date of Birth',
      helperMessage: 'Select your date of birth (Minimum age is 18 years old)',
      dateParams: {
        minDate: moment().subtract(102, 'years').toDate(),
        maxDate: moment().subtract(18, 'years').toDate(),
      },
      validation: yup.date()
        .min(moment().subtract(102, 'years').toDate(), 'Maximum age is 102 years')
        .max(moment().subtract(18, 'years').toDate(), 'Minimum age is 18 years')
        .required('Please fill in your date of birth'),
    },
    {
      type: FieldType.TEXT,
      name: 'phoneNumber',
      label: 'Phone Number',
      helperMessage: 'Enter your personal phone number (number should start with 6, 7 or 9)',
      validation: yup.string()
        .matches(/^(6[0-9]{8})$|(7[1-4][0-9]{7})$/, { message: 'Please fill in valid phone number. Please use format 6|7xxxxxxxx' })
        .required('Please fill in your phone number'),
    },
    {
      type: FieldType.TEXT,
      name: 'email',
      label: 'Email',
      helperMessage: 'Enter your email address',
      validation: yup.string()
        .email('Please fill in valid email')
        .required('Please fill in your email'),
    },
    {
      type: FieldType.CHECKBOX,
      name: 'generalPolicies',
      label: 'I confirm that I have read and accept the <a href="{{tac_url}}" target="_blank">Terms and Conditions</a>, and <a href="{{dpp_url}}" target="_blank">Data Processing Policy</a>',
      validation: yup.boolean().oneOf([true], 'Please confirm that You are agree with Terms and Conditions'),
    },
    {
      type: FieldType.CHECKBOX,
      name: 'marketingConsents',
      label: 'I agree to keep up to date with the latest news and receive special offers and discounts by any means, including electronic communications or equivalent from FiestaCredito',
      validation: yup.boolean().oneOf([true, false]),
    },
  ],
};

const personalDetailsForm = new Form(formSchema);

export default personalDetailsForm;
