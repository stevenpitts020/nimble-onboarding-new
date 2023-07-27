import React from "react";

export interface IConfirmEmail {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}
export interface IParamsTypes {
  signerId: string;
  verificationId: string;
}

export interface IConfirmEmailView {
  props: IConfirmEmail;
  error: string | null;
  errorPut: number;
  statusPut: string;
  status: string;
  handleResend(): void;
}
