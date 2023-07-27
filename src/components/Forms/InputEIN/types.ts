export interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  errors?: any;
  format?: string;
  mask?: string;
  value?: string;
  onChange: (value?: string | number) => void;
  onBlur: () => void;
}
