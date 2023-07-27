import React from "react";
import { IInvitedBy } from "../../../store/reducers/type";

export interface IStepOnboardOthers {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export interface IStepOnboardOthersView {
  props: IStepOnboardOthers;
  goToSuccess: () => void;
  handleStartOnboading: (event: React.MouseEvent<HTMLElement>) => void;
  inviteesList: IInviteesList[];
  parsedSigner: IInvitedBy | undefined;
}
export interface IInviteesList {
  id: string;
  email: string;
  signed: boolean;
}
