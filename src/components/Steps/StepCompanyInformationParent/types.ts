import { ISignerDetails } from "../../../store/reducers/type";

export interface IStepCompanyInformationParentView {
  defaultValues: ISignerDetails;
  onSubmit: (data: ISignerDetails) => void;
  goToNextScreen: () => void;
}
