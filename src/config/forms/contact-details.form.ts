import * as yup from 'yup';
import { FieldType, FormSchema } from '../../lib/dynamic-form/util/form-generator/interface/field.interface';
import { Form } from '../../lib/dynamic-form/util/form-generator/form';
import { Education, HousingTenure, MaritalStatus } from '../../enum';
import { Province } from '../../enum/Province';

const formSchema: FormSchema = {
  fields: [
    {
      name: 'personalCode',
      type: FieldType.TEXT,
      label: 'DNI / NIE',
      validation: yup.string().matches(/^(\d{8})([A-Z])$|^[XYZ]\d{7,8}[A-Z]$/).required(),
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
      validation: yup.string().required(),
    },
    {
      name: 'province',
      label: 'Province',
      type: FieldType.SELECT,
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
      validation: yup.string().required(),
    },
    {
      name: 'city',
      label: 'City',
      type: FieldType.TEXT,
      validation: yup.string().required(),
    },
    {
      name: 'street',
      label: 'Street',
      type: FieldType.TEXT,
      validation: yup.string().max(100).required(),
    },
    {
      name: 'houseNumber',
      label: 'House Number',
      type: FieldType.TEXT,
      validation: yup.string().max(10).required(),
    },
    {
      name: 'flatNumber',
      label: 'Flat Number',
      type: FieldType.TEXT,
      validation: yup.string().max(10).required(),
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
      ],
      validation: yup.string().oneOf(
        [
          HousingTenure.OWNER_WITH_MORTGAGE,
          HousingTenure.OWNER_WITH_MORTGAGE,
          HousingTenure.RENTAL,
          HousingTenure.OTHER,
        ],
      ).required(),
    },
  ],
};

const contactDetailsForm = new Form(formSchema);

export default contactDetailsForm;
