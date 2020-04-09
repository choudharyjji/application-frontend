import { BaseField } from './BaseField';
import { FieldSelectOptions, FieldType } from './interface/field.interface';

export class SelectField extends BaseField {
  private options: FieldSelectOptions[] = [];

  protected type: FieldType = FieldType.SELECT;

  constructor(name: string,
    label: string,
    placeholder: string | null,
    helperMessage: string | null,
    defaultValue: string | number | boolean | Date | null,
    autoFocus: boolean, disabled: boolean,
    options: FieldSelectOptions[]) {
    super(name, label, placeholder, helperMessage, defaultValue, autoFocus, disabled);
    this.options = options;
  }

  public getOptions(): FieldSelectOptions[] {
    return this.options;
  }

  public setOptions(options: FieldSelectOptions[]): this {
    this.options = options;
    return this;
  }
}
