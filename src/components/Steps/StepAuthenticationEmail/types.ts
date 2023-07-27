import { IProspectState, ISignerDetails } from "../../../store/reducers/type";

export interface IStepAuthenticationEmailView {
  prospect: IProspectState;
  handleSubmit: (data: ISignerDetails) => Promise<void>;
  handleValidation: (data: ISignerDetails) => Promise<void>;
}
