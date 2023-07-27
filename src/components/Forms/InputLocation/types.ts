import { IClue } from "../NewInput/types";

export interface IInputLocation {
  name?: string;
  onChange?: (value?: string) => void;
  value?: string;
  className?: string;
}

export interface IInputLocationView {
  props: IInputLocation;
  clues: IClue[];
}
