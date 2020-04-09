import * as yup from 'yup';
import environment from 'environment';
import {
  FieldSelectOptions,
  FieldType,
  FormSchema,
} from '../../lib/dynamic-form/util/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/Form';
import { Education, HousingTenure, MaritalStatus } from '../../enum';
import { Province } from '../../enum/Province';
import { PostCodeLookupResponse } from '../../dto/response/PostCodeLookupResponse';
import { SelectField } from '../../lib/dynamic-form/util/SelectField';
import HttpModule from '../../services/api/HttpModule';


const formSchema: FormSchema = {
  fields: [
    {
      type: FieldType.TEXT,
      name: 'personalCode',
      label: 'Personal Code',
      helperMessage: 'Enter your DNI / NIE code',
      validation: yup.string()
        .matches(/^(\d{8})([A-Z])$|^[XYZ]\d{7,8}[A-Z]$/, { message: 'Please fill in valid personal code' })
        .required('Please fill in your personal code'),
    },
    {
      type: FieldType.SELECT,
      name: 'maritalStatus',
      label: 'Marital Status',
      helperMessage: 'Select your marital status',
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
      validation: yup.string().required('Please select your marital status'),
    },
    {
      type: FieldType.SELECT,
      name: 'education',
      label: 'Education',
      helperMessage: 'Select your education stage',
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
      validation: yup.string().required('Please select your education'),
    },
    {
      type: FieldType.TEXT,
      name: 'postalCode',
      label: 'Postal Code',
      helperMessage: 'Enter your postcode (5 digits)',
      validation: yup.string()
        .matches(/^\d{5}$/, { message: 'Please fill in valid postal code' })
        .required('Please fill in your postal code'),
    },
    {
      type: FieldType.SELECT,
      name: 'province',
      label: 'Province',
      helperMessage: 'Select your province',
      options: [
        {
          label: 'Álava',
          value: Province.ALAVA,
        },
        {
          label: 'Albacete',
          value: Province.ALBACETE,
        },
        {
          label: 'Alicante',
          value: Province.ALICANTE,
        },
        {
          label: 'Almería',
          value: Province.ALMERIA,
        },
        {
          label: 'Asturias',
          value: Province.ASTURIAS,
        },
        {
          label: 'Ávila',
          value: Province.AVILA,
        },
        {
          label: 'Badajoz',
          value: Province.BADAJOZ,
        },
        {
          label: 'Barcelona',
          value: Province.BARCELONA,
        },
        {
          label: 'Burgos',
          value: Province.BURGOS,
        },
        {
          label: 'Cantabria',
          value: Province.CANTABRIA,
        },
        {
          label: 'Castellón',
          value: Province.CASTELLON,
        },
        {
          label: 'Ceuta',
          value: Province.CEUTA,
        },
        {
          label: 'Ciudad Real',
          value: Province.CIUDAD_REAL,
        },
        {
          label: 'Cuenca',
          value: Province.CUENCA,
        },
        {
          label: 'Cáceres',
          value: Province.CACERES,
        },
        {
          label: 'Cádiz',
          value: Province.CADIZ,
        },
        {
          label: 'Córdoba',
          value: Province.CORDOBA,
        },
        {
          label: 'Gerona',
          value: Province.GERONA,
        },
        {
          label: 'Granada',
          value: Province.GRANADA,
        },
        {
          label: 'Guadalajara',
          value: Province.GUADALAJARA,
        },
        {
          label: 'Guipúzcoa',
          value: Province.GUIPUZCOA,
        },
        {
          label: 'Huelva',
          value: Province.HUELVA,
        },
        {
          label: 'Huesca',
          value: Province.HUESCA,
        },
        {
          label: 'Islas Baleares',
          value: Province.ISLAS_BALEARES,
        },
        {
          label: 'Jaén',
          value: Province.JAEN,
        },
        {
          label: 'La Coruña',
          value: Province.LA_CORUNA,
        },
        {
          label: 'La Rioja',
          value: Province.LA_RIOJA,
        },
        {
          label: 'Las Palmas',
          value: Province.LAS_PALMAS,
        },
        {
          label: 'León',
          value: Province.LEON,
        },
        {
          label: 'Lugo',
          value: Province.LUGO,
        },
        {
          label: 'Lérida',
          value: Province.LERIDA,
        },
        {
          label: 'Madrid',
          value: Province.MADRID,
        },
        {
          label: 'Melilla',
          value: Province.MELILLA,
        },
        {
          label: 'Murcia',
          value: Province.MURCIA,
        },
        {
          label: 'Málaga',
          value: Province.MALAGA,
        },
        {
          label: 'Navarra',
          value: Province.NAVARRA,
        },
        {
          label: 'Orense',
          value: Province.ORENSE,
        },
        {
          label: 'Palencia',
          value: Province.PALENCIA,
        },
        {
          label: 'Pontevedra',
          value: Province.PONTEVEDRA,
        },
        {
          label: 'Salamanca',
          value: Province.SALAMANCA,
        },
        {
          label: 'Santa Cruz de Tenerife',
          value: Province.SANTA_CRUZ_DE_TENERIFE,
        },
        {
          label: 'Segovia',
          value: Province.SEGOVIA,
        },
        {
          label: 'Sevilla',
          value: Province.SEVILLA,
        },
        {
          label: 'Soria',
          value: Province.SORIA,
        },
        {
          label: 'Tarragona',
          value: Province.TARRAGONA,
        },
        {
          label: 'Teruel',
          value: Province.TERUEL,
        },
        {
          label: 'Toledo',
          value: Province.TOLEDO,
        },
        {
          label: 'Valencia',
          value: Province.VALENCIA,
        },
        {
          label: 'Valladolid',
          value: Province.VALLADOLID,
        },
        {
          label: 'Vizcaya',
          value: Province.VIZCAYA,
        },
        {
          label: 'Zamora',
          value: Province.ZAMORA,
        },
        {
          label: 'Zaragoza',
          value: Province.ZARAGOZA,
        },
      ],
      validation: yup.string().required('Please select your province'),
    },
    {
      type: FieldType.TEXT,
      name: 'city',
      label: 'City',
      helperMessage: 'Enter your city name',
      validation: yup.string()
        .max(100, 'City can\'t be longer than 100 symbols')
        .required('Please fill in your city'),
    },
    {
      type: FieldType.SELECT,
      name: 'street',
      label: 'Street',
      helperMessage: 'Enter your street',
      options: [
        { label: 'Other', value: 'other' },
      ],
      validation: yup.string()
        .max(100, 'Street can\'t be longer than 100 symbols')
        .required('Please fill in your street'),
    },
    {
      type: FieldType.TEXT,
      name: 'streetOther',
      label: 'Street (Other)',
      helperMessage: 'Enter your street',
      validation: yup.string()
        .max(100, 'Street can\'t be longer than 100 symbols')
        .required('Please fill in your street'),
      dependency: {
        field: 'street',
        values: ['other'],
      },
    },
    {
      type: FieldType.TEXT,
      name: 'houseNumber',
      label: 'House Number',
      helperMessage: 'Enter your house number',
      validation: yup.string()
        .max(10, 'House number can\'t be longer than 10 symbols')
        .required('Please fill in your house number'),
    },
    {
      type: FieldType.TEXT,
      name: 'flatNumber',
      label: 'Flat Number',
      helperMessage: 'Enter your flat number (not required)',
      validation: yup.string().max(10, 'Flat number can\'t be longer than 10 symbols'),
    },
    {
      type: FieldType.SELECT,
      name: 'housingTenure',
      label: 'Housing Tenure',
      helperMessage: 'Select your housing status',
      options: [
        {
          label: 'Owner With Mortgage',
          value: HousingTenure.OWNER_WITH_MORTGAGE,
        },
        {
          label: 'Owner Without Mortgage',
          value: HousingTenure.OWNER_WITHOUT_MORTGAGE,
        },
        {
          label: 'Rental',
          value: HousingTenure.RENTAL,
        },
        {
          label: 'Other',
          value: HousingTenure.OTHER,
        },
      ],
      validation: yup.string().required('Please select your housing tenure'),
    },
  ],
};

const contactDetailsForm = new Form(formSchema);

const postalCode = contactDetailsForm.getField('postalCode');
postalCode.attachOnBlurCallback(async (event) => {
  const { value } = event.target;

  const endpoint = HttpModule.parse(environment.api.postCodeLookup, { code: value });
  const { data: response } = await HttpModule.get<PostCodeLookupResponse>(endpoint);
  const { streets, province } = response.data;
  const provinceField = contactDetailsForm.getField('province');
  const streetField = contactDetailsForm.getField('street');
  if (streetField instanceof SelectField) {
    const streetOptions = streets.reduce((acc, curr) => {
      acc.push({ label: curr, value: curr });
      return acc;
    }, [] as FieldSelectOptions[]);
    streetOptions.push({ label: 'Other', value: 'other' });
    streetField.setOptions(streetOptions);
  }
  provinceField.updateValue(province);
});

export default contactDetailsForm;
