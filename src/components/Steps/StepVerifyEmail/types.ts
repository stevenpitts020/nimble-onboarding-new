import React from "react";

export interface IStep {
  className?: string;
  style?: React.CSSProperties;
}

export interface IStepView {
  props: IStep;
  error: string | null;
  signerData: {
    signerId: string;
    email: string | undefined;
    token: string | undefined;
  };
  status: string;
  onFinishClick(): void;
  onResendClick(): void;
}
