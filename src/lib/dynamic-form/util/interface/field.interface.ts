import { MixedSchema } from 'yup';
import { BaseField } from '../BaseField';

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
  field: BaseField;
  values: any[];
}

export interface FieldDateParams {
  minDate?: Date;
  maxDate?: Date;
}

export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperMessage?: string;
  options?: FieldSelectOptions[];
  dateParams?: FieldDateParams;
  dependency?: FieldDependencyOptions;
  default?: string | number | boolean;
  validation?: MixedSchema;
  autoFocus?: boolean;
  autoComplete?: boolean;
  spellCheck?: boolean;
  disabled?: boolean;
}

export interface FormSchema {
  fields: FieldSchema[];
}
