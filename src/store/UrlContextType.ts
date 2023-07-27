import { ReactChild } from "react";

export interface IProvider {
  children: ReactChild;
}

export interface IUrlContext {
  inviteeToken: string | null;
  isInvitedByName: string | null;
  currentStep: string;
}
