import { CSSProperties } from "react";

import { IFormRepeatableSigners } from "./RepeatableSigner/types";
import { IInvitedSigner } from "../../../store/reducers/type";

export interface IConfirmEmailDialog {
  isOpen?: boolean;
  onAction?: () => void;
  onCancel?: () => void;
}

export interface IInvitesForm {
  style?: CSSProperties;
  className?: string;
  loading?: boolean;
  onSkip?: () => void;
  onSubmit: (data: IFormRepeatableSigners) => void;
  onBack?: () => void;
  onChangePrimaryRole?: (isPrimaryChecked: boolean) => void;
  defaultInvites?: IInvitedSigner[];
  maxInvitees?: number;
  disallowedEmails?: string[];
}
