import { ISignerDetails } from "../../../store/reducers/type";

export interface IStepCompanyInformationView {
  defaultValues: ISignerDetails;
  onSubmit: (data: ISignerDetails) => void;
  goToNextScreen: () => void;
}
