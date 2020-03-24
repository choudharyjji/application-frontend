import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import { FieldSchema, FormSchema } from './interface/field.interface';
import { Field } from './field';

export class Form {
  private readonly formSchema: FormSchema;

  private readonly fields: Record<string, Field>;

  private readonly defaultValues: Record<string, any>;

  private readonly validationSchema: ObjectSchema<{}>;

  constructor(formSchema: FormSchema) {
    this.formSchema = formSchema;
    const result = this.parseSchema();
    this.fields = result.fields;
    this.defaultValues = result.defaultValues;
    this.validationSchema = result.validationSchema;
  }

  public getField(name: string): Field {
    return this.fields[name];
  }

  public getFields(): FieldSchema[] {
    return this.formSchema.fields;
  }

  public getFieldsArray(): [string, Field][] {
    return Object.entries(this.fields);
  }

  public getValidationSchema(): ObjectSchema<{}> {
    return this.validationSchema;
  }

  public getDefaultValues(): Record<string, any> {
    return this.defaultValues;
  }

  private parseSchema(): {
    fields: Record<string, Field>;
    defaultValues: Record<string, any>;
    validationSchema: ObjectSchema<{}>;
  } {
    const fields: Record<string, Field> = {};
    const validationSchema: Record<string, any> = {};
    const defaultValues: Record<string, any> = {};
    const fieldsSchema = this.formSchema.fields;

    fieldsSchema.forEach((field) => {
      fields[field.name] = new Field(
        field.label,
        field.name,
        field.type,
        field.default,
        field.placeholder,
        field.tooltip,
        field.options,
        field.dateParams,
        field.autoFocus,
        field.autoComplete,
        field.spellCheck,
        field.disabled,
      );

      defaultValues[field.name] = field.default !== null ? field.default : '';

      // validation schema
      let fieldValidation = field.validation;
      if (fieldValidation) {
        if (field.dependency !== undefined) {
          if (fieldValidation.constructor.name === 'StringSchema') {
            fieldValidation = yup.string().when(field.dependency.field, {
              is: (val: string) => field.dependency !== undefined && field.dependency.values.indexOf(val) > -1,
              then: field.validation,
            });
          }
          if (fieldValidation.constructor.name === 'BooleanSchema') {
            fieldValidation = yup.boolean().when(field.dependency.field, {
              is: (val: string) => field.dependency !== undefined && field.dependency.values.indexOf(val) > -1,
              then: field.validation,
            });
          }
          if (fieldValidation.constructor.name === 'NumberSchema') {
            fieldValidation = yup.number().when(field.dependency.field, {
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
        fields[field.name].dependency = {
          field: fields[field.dependency.field],
          values: field.dependency.values,
        };
      }
    });

    return { fields, defaultValues, validationSchema: yup.object(validationSchema) };
  }
}
