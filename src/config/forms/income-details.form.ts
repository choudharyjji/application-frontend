import * as yup from 'yup';
import { FieldType, FormJson } from '../../dynamic-form/util/form-generator/interface/field.interface';
import { Form } from '../../dynamic-form/util/form-generator/form';
import {
  IncomeSource, JobArea, VehicleOwnership,
} from '../../enum';

const formSchema: FormJson = {
  fields: [
    {
      label: 'Monthly Income',
      name: 'monthlyIncome',
      type: FieldType.TEXT,
      validation: yup.number().positive().max(99999).required(),
    },
    {
      name: 'incomeSource',
      label: 'Income Source',
      type: FieldType.SELECT,
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
      name: 'payDay',
      label: 'Payday',
      type: FieldType.TEXT,
      validation: yup.number().positive().lessThan(31).required(),
    },
    {
      name: 'jobArea',
      label: 'Job Area',
      type: FieldType.SELECT,
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
      validation: yup.string().required(),
    },
    {
      name: 'incomeContractStartedAt',
      label: 'Income Contract Started At',
      type: FieldType.DATE,
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
      name: 'vehicleOwnership',
      label: 'Vehicle Ownership',
      type: FieldType.SELECT,
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
    },
    {
      name: 'vehicleLicensePlateNumber',
      label: 'Last 3 letters of the license plate (example: 5649 JSN)',
      type: FieldType.TEXT,
      dependency: {
        field: 'vehicleOwnership',
        values: [VehicleOwnership.CAR],
      },
      validation: yup.string().matches(/^[a-zA-Z]{3}$/).required(),
    },
    {
      name: 'iban',
      label: 'Iban',
      type: FieldType.TEXT,

    },
    {
      name: 'usingOnlineBanking',
      label: 'Do you use online banking?',
      type: FieldType.CHECKBOX,
    },
  ],
};

const incomeDetailsForm = new Form(formSchema);

export default incomeDetailsForm;
