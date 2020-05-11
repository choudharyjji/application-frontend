import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { FieldType, FormSchema } from './interface/field.interface';
import { InputField } from './InputField';
import { BaseField } from './BaseField';
import { SelectField } from './SelectField';
import { DateField } from './DateField';

export class Form {
  private readonly formSchema: FormSchema;

  private readonly fields: Record<string, BaseField>;

  private readonly defaultValues: Record<string, string | number | boolean | null>;

  private readonly validationSchema: ObjectSchema<{}>;

  constructor(formSchema: FormSchema) {
    this.formSchema = formSchema;
    const result = this.parseSchema();
    this.fields = result.fields;
    this.defaultValues = result.defaultValues;
    this.validationSchema = result.validationSchema;
  }

  public getField(name: string): BaseField {
    return this.fields[name];
  }

  public getFieldsArray(): [string, BaseField][] {
    return Object.entries(this.fields);
  }

  public getValidationSchema(): ObjectSchema<{}> {
    return this.validationSchema;
  }

  public getDefaultValues(): Record<string, any> {
    return this.defaultValues;
  }

  private parseSchema(): {
    fields: Record<string, BaseField>;
    defaultValues: Record<string, any>;
    validationSchema: ObjectSchema<{}>;
  } {
    const fields: Record<string, BaseField> = {};
    const validationSchema: Record<string, any> = {};
    const defaultValues: Record<string, any> = {};
    const fieldsSchema = this.formSchema.fields;

    fieldsSchema.forEach((field) => {
      if (Form.isInputField(field.type)) {
        fields[field.name] = (new InputField(field.name,
          field.label,
          field.prefix || null,
          field.placeholder || null,
          field.helperMessage || null,
          field.default || null,
          field.autoFocus || false,
          field.disabled || false,
          field.autoComplete || false,
          field.spellCheck || false))
          .setType(field.type);
      }
      if (field.type === FieldType.SELECT) {
        fields[field.name] = new SelectField(field.name,
          field.label,
          field.prefix || null,
          field.placeholder || null,
          field.helperMessage || null,
          field.default || null,
          field.autoFocus || false,
          field.disabled || false,
          field.options || []);
      }
      if (field.type === FieldType.DATE) {
        fields[field.name] = new DateField(field.name,
          field.label,
          field.prefix || null,
          field.placeholder || null,
          field.helperMessage || null,
          field.default || null,
          field.autoFocus || false,
          field.disabled || false,
          field.dateParams ? field.dateParams.minDate || null : null,
          field.dateParams ? field.dateParams.maxDate || null : null);
      }

      defaultValues[field.name] = field.default !== null ? field.default : '';

      // validation schema
      let fieldValidation = field.validation;
      if (fieldValidation) {
        if (field.dependency !== undefined) {
          if (fieldValidation.type === 'string') {
            fieldValidation = yup.string().when(field.dependency.field, {
              is: (val: string) => field.dependency !== undefined && field.dependency.values.indexOf(val) > -1,
              then: field.validation,
            });
          }
          if (fieldValidation.type === 'boolean') {
            fieldValidation = yup.boolean().when(field.dependency.field, {
              is: (val: string) => field.dependency !== undefined && field.dependency.values.indexOf(val) > -1,
              then: field.validation,
            });
          }
          if (fieldValidation.type === 'number') {
            fieldValidation = yup.number().when(field.dependency.field, {
              is: (val: string) => field.dependency !== undefined && field.dependency.values.indexOf(val) > -1,
              then: field.validation,
            });
          }
          if (fieldValidation.type === 'date') {
            fieldValidation = yup.date().when(field.dependency.field, {
              is: (val: string) => field.dependency !== undefined && field.dependency.values.indexOf(val) > -1,
              then: field.validation,
            });
          }
        }
        validationSchema[field.name] = fieldValidation;
      }
    });

    // dependency
    fieldsSchema.forEach((field) => {
      if (field.dependency !== undefined) {
        fields[field.name].setDependency({
          field: fields[field.dependency.field],
          values: field.dependency.values,
        });
      }
    });

    return { fields, defaultValues, validationSchema: yup.object(validationSchema) };
  }

  private static isInputField(type: FieldType): boolean {
    const inputTypes = [
      FieldType.TEXT,
      FieldType.TEL,
      FieldType.NUMBER,
      FieldType.EMAIL,
      FieldType.PASSWORD,
      FieldType.HIDDEN,
      FieldType.CHECKBOX,
    ];
    return inputTypes.indexOf(type) > -1;
  }
}
