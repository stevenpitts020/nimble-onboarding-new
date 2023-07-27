import { Control } from "react-hook-form";
import { IClue } from "../../Forms/NewInput/types";

export interface INewStepInstructionsView {
  control: Control;
  onGetStarted: () => void;
  disableGetStarted: boolean;
  logoUrl: string;
  logoName: string;
  clues: IClue[];
  showSidebarTips?: boolean;
  goToTerms: () => void;
}
