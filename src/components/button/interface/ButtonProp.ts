import { FixMeType } from '../../../type/fix-me.type';

export interface ButtonProp {
  label: string;
  type: 'button' | 'reset' | 'submit' | undefined;
  fill?: 'clear' | 'solid' | undefined;
  color?: 'yellow' | 'blue';
  disabled?: boolean;
  onClick?: (e: FixMeType) => void;
}
