import React from "react";

export interface IStepInstructions {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  error?: string;
}

export interface IParamsTypes {
  accountRequestId: string;
  signerId: string;
}
