export type CallbackEvent = React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>;

export interface FieldCallbacks {
  onChange: { (event: CallbackEvent): void }[];
  onBlur: { (event: CallbackEvent): void }[];
  onFocus: { (event: CallbackEvent): void }[];
}

export enum FieldCallbackType {
  onChange,
  onBlur,
  onFocus
}


