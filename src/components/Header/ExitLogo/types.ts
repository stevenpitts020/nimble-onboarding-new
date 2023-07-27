import { IInstitution } from "../../../NimbleRouter";

export interface IExitLogoProps {
  className?: string;
}

export interface IExitLogoViewProps {
  props?: IExitLogoProps;
  institution: IInstitution | undefined;
  isOpenConfirmModal: boolean;
  onCancelConfirmModal: () => void;
  onActionConfirmModal: () => void;
  onOpenConfirmModal: () => void;
}
