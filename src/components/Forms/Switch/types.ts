export interface ISwitch {
  name: string;
  label: string;
  valueOff?: any;
  valueOn?: any;
  textOff?: string;
  textOn?: string;
  isChecked?: boolean;
  onChange: (valueChanged: any) => void;
  forwardRef?: any;
  disabled?: boolean;
}
