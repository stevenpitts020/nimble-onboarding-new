import { SliderOrientation } from "./enum";
export interface ISlider {
  id: string;
  name: string;
  max: number;
  min: number;
  step: number;
  className?: string;
  includeValueInfo?: boolean;
  value: number;
  orientation: SliderOrientation;
  onChange?: (value: number) => void;
  disabled?: boolean;
  additionalInfo?: React.ReactNode;
  black?: boolean;
}
