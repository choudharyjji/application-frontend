import * as yup from 'yup';
import moment from 'moment';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/Form';
import {
  IncomeSource, JobArea, VehicleOwnership,
} from '../../enum';

const formSchema: FormSchema = {
  fields: [
    {
      type: FieldType.TEXT,
      name: 'monthlyIncome',
      label: 'Monthly Income',
      helperMessage: 'Enter your monthly net income',
      default: 0,
      validation: yup.number()
        .typeError('Please fill in total monthly net income')
        .min(0, 'Please enter monthly income greater than or equal to 0')
        .max(99999, 'Please enter monthly income less than or equal to 99999')
        .required('Please fill in total monthly net income'),
    },
    {
      type: FieldType.SELECT,
      name: 'incomeSource',
      label: 'Income Source',
      helperMessage: 'Select your income source',
      options: [
        {
          label: 'Fixed',
          value: IncomeSource.FIXED,
        },
        {
          label: 'Fixed Partial',
          value: IncomeSource.FIXED_PARTIAL,
        },
        {
          label: 'Temporary',
          value: IncomeSource.TEMPORARY,
        },
        {
          label: 'Self Employed',
          value: IncomeSource.SELF_EMPLOYED,
        },
        {
          label: 'Government',
          value: IncomeSource.GOVERNMENT,
        },
        {
          label: 'Military',
          value: IncomeSource.MILITARY,
        },
        {
          label: 'Student',
          value: IncomeSource.STUDENT,
        },
        {
          label: 'Pension',
          value: IncomeSource.PENSION,
        },
        {
          label: 'Housewife',
          value: IncomeSource.HOUSEWIFE,
        },
        {
          label: 'Unemployed',
          value: IncomeSource.UNEMPLOYED,
        },
        {
          label: 'Other',
          value: IncomeSource.OTHER,
        },
      ],
      validation: yup.string().required(),
    },
    {
      type: FieldType.TEXT,
      name: 'incomePayday',
      label: 'Income Payday',
      helperMessage: 'Select your income payday',
      validation: yup.number()
        .typeError('Please select your income payday')
        .positive()
        .max(31)
        .required('Please select your income payday'),
    },
    {
      type: FieldType.SELECT,
      name: 'jobArea',
      label: 'Job Area',
      helperMessage: 'Select area you working in',
      options: [
        {
          label: 'Army',
          value: JobArea.ARMY,
        },
        {
          label: 'Building',
          value: JobArea.BUILDING,
        },
        {
          label: 'Education',
          value: JobArea.EDUCATION,
        },
        {
          label: 'Finance',
          value: JobArea.FINANCE,
        },
        {
          label: 'Hospitality',
          value: JobArea.HOSPITALITY,
        },
        {
          label: 'Leisure',
          value: JobArea.LEISURE,
        },
        {
          label: 'Medicine',
          value: JobArea.MEDICINE,
        },
        {
          label: 'Production',
          value: JobArea.PRODUCTION,
        },
        {
          label: 'Public Administration',
          value: JobArea.PUBLIC_ADMINISTRATION,
        },
        {
          label: 'Raw Materials Mining',
          value: JobArea.RAW_MATERIALS_MINING,
        },
        {
          label: 'Sales',
          value: JobArea.SALES,
        },
        {
          label: 'Tourism',
          value: JobArea.TOURISM,
        },
        {
          label: 'Other',
          value: JobArea.OTHER,
        },
      ],
      validation: yup.string().required('Please select your job area'),
    },
    {
      type: FieldType.DATE,
      name: 'incomeContractStartedAt',
      label: 'Income Contract Started At',
      helperMessage: 'Please enter when your contract started',
      dateParams: {
        minDate: moment().subtract(80, 'years').toDate(),
        maxDate: moment().subtract(1, 'days').toDate(),
      },
      validation: yup.date()
        .typeError('Please fill in when your contract started')
        .min(moment().subtract(80, 'years').toDate(), 'Contract can not be longer than 80 years')
        .max(moment().subtract(1, 'days').toDate(), 'Contract minimum duration is 1 day')
        .required('Please fill in when your contract started'),
      dependency: {
        field: 'incomeSource',
        values: [
          IncomeSource.FIXED,
          IncomeSource.FIXED_PARTIAL,
          IncomeSource.TEMPORARY,
          IncomeSource.SELF_EMPLOYED,
          IncomeSource.GOVERNMENT,
          IncomeSource.MILITARY,
          IncomeSource.PENSION,
          IncomeSource.OTHER,
        ],
      },
    },
    {
      type: FieldType.SELECT,
      name: 'vehicleOwnership',
      label: 'Vehicle Ownership',
      helperMessage: 'Please select what type of vehicle do you have',
      options: [
        {
          label: 'Moto',
          value: VehicleOwnership.MOTO,
        },
        {
          label: 'Car',
          value: VehicleOwnership.CAR,
        },
        {
          label: 'Van',
          value: VehicleOwnership.VAN,
        },
        {
          label: 'Truck',
          value: VehicleOwnership.TRUCK,
        },
        {
          label: 'Other',
          value: VehicleOwnership.OTHER,
        },
        {
          label: 'Not Available',
          value: VehicleOwnership.NOT_AVAILABLE,
        },
      ],
      validation: yup.string().required('Please select your vehicle ownership'),
    },
    {
      type: FieldType.TEXT,
      name: 'vehicleLicensePlateNumber',
      label: 'Last 3 letters of the license plate (example: 5649 JSN)',
      helperMessage: 'Enter the last 3 letters of the license plate',
      dependency: {
        field: 'vehicleOwnership',
        values: [VehicleOwnership.CAR],
      },
      validation: yup.string()
        .matches(/^[a-zA-Z]{3}$/, { message: 'Please fill in valid plate number' })
        .required('Please fill in the last 3 letters of the license plate'),
    },
    {
      type: FieldType.TEXT,
      name: 'iban',
      label: 'IBAN',
      helperMessage: 'Enter your International Bank Account Number (IBAN should start with ES)',
    },
    {
      type: FieldType.CHECKBOX,
      name: 'usingOnlineBanking',
      label: 'Do you use online banking?',
      validation: yup.boolean().oneOf([true, false]),
    },
  ],
};

const incomeDetailsForm = new Form(formSchema);

const iban = incomeDetailsForm.getField('iban');
iban.attachOnBlurCallback((event) => {
  const value = event.target.value.replace(/ /g, '');
  iban.updateValue(value);
});

export default incomeDetailsForm;
