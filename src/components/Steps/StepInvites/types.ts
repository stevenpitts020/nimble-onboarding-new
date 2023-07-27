import React from "react";
import { IFormRepeatableSigners } from "../../Forms/InvitesForm/RepeatableSigner/types";
import { IInvitedSigner, IProspectState } from "../../../store/reducers/type";

export interface IStepInvites {
  style?: React.CSSProperties;
  title?: string;
  maxInvitees?: number;
}

export interface IStepInvitesView {
  props: IStepInvites;
  invitees: IInvitedSigner[];
  prospect: IProspectState;
  selectedProductName: string;
  showMessage: boolean;
  handleBack(): void;
  handleSkip(): void;
  onChangePrimaryRole(isPrimaryChecked: boolean): void;
  onSubmitForm(data: IFormRepeatableSigners): Promise<void>;
}
