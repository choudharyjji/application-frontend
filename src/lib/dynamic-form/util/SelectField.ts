import { BaseField } from './BaseField';
import { FieldSelectOptions, FieldType } from './interface/field.interface';

export class SelectField extends BaseField {
  private options: FieldSelectOptions[] | null = null;

  protected type: FieldType = FieldType.SELECT;

  constructor(name: string,
    label: string,
    placeholder: string | null,
    defaultValue: string | number | boolean | null,
    autoFocus: boolean, disabled: boolean,
    options: FieldSelectOptions[] | null) {
    super(name, label, placeholder, defaultValue, autoFocus, disabled);
    this.options = options;
  }

  public getOptions(): FieldSelectOptions[] | null {
    return this.options;
  }

  public setOptions(options: FieldSelectOptions[] | null): this {
    this.options = options;
    return this;
  }
}
