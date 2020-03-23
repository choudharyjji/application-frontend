import { MixedSchema } from 'yup';
import { Field } from '../field';

export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEL = 'tel',
  HIDDEN = 'hidden',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  DATE = 'date',
}

export interface FieldSelectOptions {
  label: string;
  value: string;
}

export interface FieldDependencyOptions {
  field: string;
  values: any[];
}

export interface FieldDependency {
  field: Field;
  values: any[];
}

export interface FieldInterface {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldSelectOptions[];
  dependency?: FieldDependencyOptions;
  default?: string;
  validation?: MixedSchema;
  autoFocus?: boolean;
  autoComplete?: boolean;
  spellCheck?: boolean;
  disabled?: boolean;
}

export interface FormJson {
  fields: FieldInterface[];
}
