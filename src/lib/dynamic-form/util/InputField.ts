import { BaseField } from './BaseField';

export class InputField extends BaseField {
  protected autoComplete = false;

  protected spellCheck = false;

  constructor(name: string,
    label: string,
    prefix: string | null,
    placeholder: string | null,
    helperMessage: string | null,
    defaultValue: string | number | boolean | Date | null,
    autoFocus: boolean,
    disabled: boolean,
    autoComplete: boolean,
    spellCheck: boolean) {
    super(name, label, prefix, placeholder, helperMessage, defaultValue, autoFocus, disabled);
    this.autoComplete = autoComplete;
    this.spellCheck = spellCheck;
  }

  public getAutoComplete(): boolean {
    return this.autoComplete;
  }

  public setAutoComplete(autoComplete: boolean): this {
    this.autoComplete = autoComplete;
    return this;
  }

  public getSpellCheck(): boolean {
    return this.spellCheck;
  }

  public setSpellCheck(spellCheck: boolean): this {
    this.spellCheck = spellCheck;
    return this;
  }
}
