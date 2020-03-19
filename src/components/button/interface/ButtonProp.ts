export interface ButtonProp {
  label: string;
  type: 'button' | 'reset' | 'submit' | undefined;
  fill?: 'clear' | 'solid' | undefined;
  disabled?: boolean;
  onClick?: (e: any) => void;
}