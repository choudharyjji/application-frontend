import { FieldType } from './interface/field.interface';
import { BaseField } from './BaseField';

export class DateField extends BaseField {
  protected minDate: Date | null = null;

  protected maxDate: Date | null = null;

  protected type: FieldType = FieldType.DATE;

  constructor(name: string,
    label: string,
    placeholder: string | null,
    helperMessage: string | null,
    defaultValue: string | number | boolean | null,
    autoFocus: boolean,
    disabled: boolean,
    minDate: Date | null,
    maxDate: Date | null) {
    super(name, label, placeholder, helperMessage, defaultValue, autoFocus, disabled);
    this.minDate = minDate;
    this.maxDate = maxDate;
  }

  public getMinDate(): Date | null {
    return this.minDate;
  }

  public setMinDate(minDate: Date | null): this {
    this.minDate = minDate;
    return this;
  }

  public getMaxDate(): Date | null {
    return this.maxDate;
  }

  public setMaxDate(maxDate: Date | null): this {
    this.maxDate = maxDate;
    return this;
  }
}
