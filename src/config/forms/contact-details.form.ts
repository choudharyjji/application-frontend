import * as yup from 'yup';
import { FieldType, FormJson } from '../../dynamic-form/util/form-generator/interface/field.interface';
import { Form } from '../../dynamic-form/util/form-generator/form';
import { Education, HousingTenure, MaritalStatus } from '../../enum';

const formSchema: FormJson = {
  fields: [
    {
      name: 'dni',
      type: FieldType.TEXT,
      label: 'DNI / NIE',
      validation: yup.string().required(),
    },
    {
      name: 'maritalStatus',
      label: 'Marital Status',
      type: FieldType.SELECT,
      options: [
        {
          label: 'Not Married',
          value: MaritalStatus.NOT_MARRIED,
        },
        {
          label: 'Married',
          value: MaritalStatus.MARRIED,
        },
        {
          label: 'Divorced',
          value: MaritalStatus.DIVORCED,
        },
        {
          label: 'Widower',
          value: MaritalStatus.WIDOWER,
        },
        {
          label: 'Living With Parents',
          value: MaritalStatus.LIVING_WITH_PARENTS,
        },
      ],
      validation: yup.string().required(),
    },
    {
      name: 'education',
      label: 'Education',
      type: FieldType.SELECT,
      options: [
        {
          label: 'None',
          value: Education.NONE,
        },
        {
          label: 'Primary',
          value: Education.PRIMARY,
        },
        {
          label: 'Secondary',
          value: Education.SECONDARY,
        },
        {
          label: 'Vocational',
          value: Education.VOCATIONAL,
        },
        {
          label: 'Higher',
          value: Education.HIGHER,
        },
        {
          label: 'Master',
          value: Education.MASTER,
        },
        {
          label: 'PHD',
          value: Education.PHD,
        },
      ],
      validation: yup.string().required(),
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: FieldType.TEXT,
    },
    {
      name: 'province',
      label: 'Province',
      type: FieldType.TEXT,
    },
    {
      name: 'city',
      label: 'City',
      type: FieldType.TEXT,
    },
    {
      name: 'street',
      label: 'Street',
      type: FieldType.TEXT,
    },
    {
      name: 'houseNumber',
      label: 'House Number',
      type: FieldType.TEXT,
    },
    {
      name: 'flatNumber',
      label: 'Flat Number',
      type: FieldType.TEXT,
    },
    {
      name: 'housingTenure',
      label: 'Housing Tenure',
      type: FieldType.SELECT,
      options: [
        {
          label: 'Owner With Mortgage',
          value: HousingTenure.OWNER_WITH_MORTGAGE,
        },
        {
          label: 'Owner Without Mortgage',
          value: HousingTenure.OWNER_WITH_MORTGAGE,
        },
        {
          label: 'Rental',
          value: HousingTenure.RENTAL,
        },
        {
          label: 'Other',
          value: HousingTenure.OTHER,
        },
        {
          label: 'Higher',
          value: Education.HIGHER,
        },
      ],
      validation: yup.string().required(),
    },
  ],
};

const contactDetailsForm = new Form(formSchema);

export default contactDetailsForm;
