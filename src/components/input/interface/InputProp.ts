import { FixMeType } from '../../../type/fix-me.type';

export interface InputProp {
  label: string;
  name: string;
  type: FixMeType;
  prefix: FixMeType;
  placeholder: FixMeType;
  tooltip?: string;
  disabled: FixMeType;
  autoFocus: FixMeType;
  innerRef?: FixMeType;
  spellCheck?: FixMeType;
  autoComplete?: FixMeType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: FixMeType;
}
