import { FieldInterface, FormJson } from './interface/field.interface';
import { Field } from './field';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export class Form {
  private readonly fieldsJson: FieldInterface[];

  private readonly fields: Record<string, Field>;

  private readonly defaultValues: any;

  private readonly validationSchema: ObjectSchema<{}>;

  constructor(formJson: FormJson) {
    this.fieldsJson = formJson.fields;

    const result = this.parseJson(formJson);
    this.fields = result.fields;
    this.defaultValues = result.defaultValues;
    this.validationSchema = result.validationSchema;
  }

  public getField(name: string): Field {
    return this.fields[name];
  }

  public getFields(): FieldInterface[] {
    return this.fieldsJson;
  }

  public getFieldsArray(): [string, Field][] {
    return Object.entries(this.fields);
  }

  public getValidationSchema(): ObjectSchema<{}> {
    return this.validationSchema;
  }

  public getDefaultValues(): any {
    return this.defaultValues;
  }

  private parseJson(formJson: FormJson): {
    fields: Record<string, Field>,
    defaultValues: Record<string, any>,
    validationSchema: ObjectSchema<{}>
  } {
    const fields: Record<string, Field> = {};
    const validationSchema: Record<string, any> = {};
    const defaultValues: Record<string, any> = {};
    this.fieldsJson.forEach((field) => {
      fields[field.name] = new Field(
        field.label,
        field.name,
        field.type,
        field.default,
        field.placeholder,
        field.options,
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
    this.fieldsJson.forEach((field) => {
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
