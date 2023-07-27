import { IProspectState, ISignerDetails } from "../../../store/reducers/type";

export interface IStepAuthenticationPhoneView {
  prospect: IProspectState;
  handleSubmit: (data: ISignerDetails) => Promise<void>;
  handleValidation: (data: ISignerDetails) => Promise<void>;
}
