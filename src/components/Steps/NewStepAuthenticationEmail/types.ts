import { Control } from "react-hook-form";
import { IClue } from "../../Forms/NewInput/types";

export interface IStepAuthenticationEmailView {
  control: Control;
  onSubmit: () => void;
  errors?: { [key: string]: { message?: string } };
  onClickDisclosures: () => void;
  clues: IClue[];
  onBlurInput: () => void;
  showSidebarTips?: boolean;
}
