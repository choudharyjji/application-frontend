import { FieldDependency, FieldSelectOptions, FieldType } from './interface/field.interface';
import { CallbackEvent, FieldCallbacks, FieldCallbackType } from './interface/field-callback.interface';

export class Field {
  private readonly _id: string;

  private _label: string;

  private _name: string;

  private _type: FieldType;

  private _options: FieldSelectOptions[] | undefined = undefined;

  private readonly _defaultValue: string | null;

  private _placeholder?: string;

  private _autoFocus = false;

  private _autoComplete = false;

  private _spellCheck = false;

  private _disabled = false;

  private _visible = true;

  private _dependency: FieldDependency | null = null;

  private _setValueFn: any;

  private _watchFn: any;

  private readonly callbacks: FieldCallbacks;

  constructor(
    label: string,
    name: string,
    type: FieldType,
    defaultValue: string | null = null,
    placeholder: string | undefined = undefined,
    options: FieldSelectOptions[] | undefined,
    autoFocus = false,
    autoComplete = false,
    spellCheck = false,
    disabled = false,
  ) {
    this._id = `${name}_${Date.now()}`;
    this._label = label;
    this._name = name;
    this._type = type;
    this._defaultValue = defaultValue;
    this._placeholder = placeholder;
    this._options = options;
    this._autoFocus = autoFocus;
    this._autoComplete = autoComplete;
    this._spellCheck = spellCheck;
    this._disabled = disabled;

    this.callbacks = {
      onChange: [],
      onBlur: [],
      onFocus: [],
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get type(): FieldType {
    return this._type;
  }

  set type(value: FieldType) {
    this._type = value;
  }

  get defaultValue(): string | null {
    return this._defaultValue;
  }

  get options(): FieldSelectOptions[] | undefined {
    return this._options;
  }

  set options(value: FieldSelectOptions[] | undefined) {
    this._options = value;
  }

  get placeholder(): string | undefined {
    return this._placeholder;
  }

  set placeholder(value: string | undefined) {
    this._placeholder = value;
  }

  get autoFocus(): boolean {
    return this._autoFocus;
  }

  set autoFocus(value: boolean) {
    this._autoFocus = value;
  }

  get autoComplete(): boolean {
    return this._autoComplete;
  }

  set autoComplete(value: boolean) {
    this._autoComplete = value;
  }

  get spellCheck(): boolean {
    return this._spellCheck;
  }

  set spellCheck(value: boolean) {
    this._spellCheck = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  get dependency(): FieldDependency | null {
    return this._dependency;
  }

  set dependency(dependency: FieldDependency | null) {
    if (dependency != null) {
      this.visible = false;
      const that = this;
      dependency.field.attachOnBlurCallback((event) => {
        const value = dependency.field.watch();
        that.visible = dependency.values.indexOf(value) > -1;
      });
    }
    this._dependency = dependency;
  }

  set setValueFn(value: any) {
    this._setValueFn = value;
  }

  set watchFn(value: any) {
    this._watchFn = value;
  }

  public setValue(value: any) {
    this._setValueFn(this.name, value);
  }

  public watch() {
    return this._watchFn(this.name);
  }

  public isInputElement(): boolean {
    return this.isTextType()
      || this.isNumberType()
      || this.isEmailType()
      || this.isNumberType()
      || this.isPasswordType()
      || this.isTelType()
      || this.isCheckboxType()
      || this.isDateType();
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

  public attachOnChangeCallback(callback: { (event: CallbackEvent): void }) {
    this.attachCallback(FieldCallbackType.onChange, callback);
    return this;
  }

  public attachOnFocusCallback(callback: { (event: CallbackEvent): void }) {
    this.attachCallback(FieldCallbackType.onFocus, callback);
    return this;
  }

  public attachOnBlurCallback(callback: { (event: CallbackEvent): void }) {
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

  private attachCallback(type: FieldCallbackType, callback: { (event: CallbackEvent): void }): Field {
    switch (type) {
      case FieldCallbackType.onChange:
        this.callbacks.onChange.push(callback);
        break;
      case FieldCallbackType.onBlur:
        this.callbacks.onBlur?.push(callback);
        break;
      case FieldCallbackType.onFocus:
        this.callbacks.onFocus?.push(callback);
        break;
    }
    return this;
  }

  private triggerCallback(type: FieldCallbackType, event: CallbackEvent) {
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
    }
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(event);
      });
    }
  }
}
