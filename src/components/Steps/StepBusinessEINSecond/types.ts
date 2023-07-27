import { ISignerDetails } from "../../../store/reducers/type";

export interface IStepBusinessEINSecondView {
  defaultValues: ISignerDetails;
  onSubmit: (data: ISignerDetails) => void;
  goToNextScreen: () => void;
  goToNextScreenIfEmpty: () => void;
}
