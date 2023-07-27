import { ISignerDetails } from "../../../store/reducers/type";
import { ReactNode } from "react";

export interface IStepBusinessEINForm {
  defaultValues: ISignerDetails;
  onSubmit: (data: ISignerDetails) => void;
  children: ReactNode;
  textInput: string;
  goToNextScreen: () => void;
  goToNextScreenIfEmpty?: () => void;
  onValidate?: (data: ISignerDetails) => void;
  signerId?: string;
  renderHeader: () => JSX.Element;
}
