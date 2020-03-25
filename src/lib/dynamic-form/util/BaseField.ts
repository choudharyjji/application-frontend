import { Control } from 'react-hook-form';
import { FieldDependency, FieldType } from './interface/field.interface';
import { CallbackEvent, FieldCallbacks, FieldCallbackType } from './interface/field-callback.interface';

export abstract class BaseField {
  private readonly id: string;

  protected label: string;

  protected name: string;

  protected placeholder: string | null = null;

  protected defaultValue: string | number | boolean | null = null;

  protected autoFocus = false;

  protected disabled = false;

  protected visible = true;

  private dependency: FieldDependency | null = null;

  private readonly callbacks: FieldCallbacks;

  protected type: FieldType = FieldType.TEXT;

  protected control: Control | null = null;

  protected constructor(name: string,
                        label: string,
                        placeholder: string | null,
                        defaultValue: string | number | boolean | null,
                        autoFocus: boolean,
                        disabled: boolean) {
    this.id = `${name}_${Date.now()}`;
    this.name = name;
    this.label = label;
    this.placeholder = placeholder;
    this.defaultValue = defaultValue;
    this.autoFocus = autoFocus;
    this.disabled = disabled;

    this.callbacks = {
      onChange: [],
      onBlur: [],
      onFocus: [],
    };
  }

  public getId(): string {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }

  public setLabel(label: string): BaseField {
    this.label = label;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public getPlaceHolder(): string | null {
    return this.placeholder;
  }

  public setPlaceHolder(placeholder: string | null): this {
    this.placeholder = placeholder;
    return this;
  }

  public getAutoFocus(): boolean {
    return this.autoFocus;
  }

  public setAutoFocus(autoFocus: boolean): this {
    this.autoFocus = autoFocus;
    return this;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public setDisabled(disabled: boolean): this {
    this.disabled = disabled;
    return this;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setVisible(visible: boolean): this {
    this.visible = visible;
    return this;
  }

  public getDependency(): FieldDependency | null {
    return this.dependency;
  }

  public setDependency(dependency: FieldDependency | null): this {
    this.dependency = dependency;
    return this;
  }

  public hasDependency(): boolean {
    return this.dependency !== null;
  }

  public getType(): FieldType {
    return this.type;
  }

  public setType(type: FieldType): this {
    this.type = type;
    return this;
  }

  public setControl(control: Control | null): this {
    this.control = control;
    return this;
  }

  public updateValue(value: string | number | boolean): void {
    if (this.control !== null) {
      this.control.setValue(this.name, value);
    }
  }

  public isInputElement(): boolean {
    return this.isTextType()
      || this.isNumberType()
      || this.isEmailType()
      || this.isNumberType()
      || this.isPasswordType()
      || this.isTelType()
      || this.isCheckboxType();
  }

  public isTextType(): boolean {
    return this.type === FieldType.TEXT;
  }

  public isNumberType(): boolean {
    return this.type === FieldType.NUMBER;
  }

  public isEmailType(): boolean {
    return this.type === FieldType.EMAIL;
  }

  public isPasswordType(): boolean {
    return this.type === FieldType.PASSWORD;
  }

  public isTelType(): boolean {
    return this.type === FieldType.TEL;
  }

  public isDateType(): boolean {
    return this.type === FieldType.DATE;
  }

  public isSelectType(): boolean {
    return this.type === FieldType.SELECT;
  }

  public isCheckboxType(): boolean {
    return this.type === FieldType.CHECKBOX;
  }

  public attachOnChangeCallback(callback: { (event: CallbackEvent): void }): this {
    this.attachCallback(FieldCallbackType.onChange, callback);
    return this;
  }

  public attachOnFocusCallback(callback: { (event: CallbackEvent): void }): this {
    this.attachCallback(FieldCallbackType.onFocus, callback);
    return this;
  }

  public attachOnBlurCallback(callback: { (event: CallbackEvent): void }): this {
    this.attachCallback(FieldCallbackType.onBlur, callback);
    return this;
  }

  public onChangeCallback(event: CallbackEvent): void {
    this.triggerCallback(FieldCallbackType.onChange, event);
  }

  public onBlurCallback(event: CallbackEvent): void {
    this.triggerCallback(FieldCallbackType.onBlur, event);
  }

  public onFocusCallback(event: CallbackEvent): void {
    this.triggerCallback(FieldCallbackType.onFocus, event);
  }

  private attachCallback(type: FieldCallbackType, callback: { (event: CallbackEvent): void }): this {
    switch (type) {
      case FieldCallbackType.onChange:
        this.callbacks.onChange.push(callback);
        break;
      case FieldCallbackType.onBlur:
        this.callbacks.onBlur.push(callback);
        break;
      case FieldCallbackType.onFocus:
        this.callbacks.onFocus.push(callback);
        break;
      default:
        break;
    }
    return this;
  }

  private triggerCallback(type: FieldCallbackType, event: CallbackEvent): void {
    let callbacks;
    switch (type) {
      case FieldCallbackType.onChange:
        callbacks = this.callbacks.onChange;
        break;
      case FieldCallbackType.onFocus:
        callbacks = this.callbacks.onFocus;
        break;
      case FieldCallbackType.onBlur:
        callbacks = this.callbacks.onBlur;
        break;
      default:
        callbacks = null;
        break;
    }
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(event);
      });
    }
  }
}
