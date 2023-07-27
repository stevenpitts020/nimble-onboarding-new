import React from "react";

export interface IInputCode {
  value?: string;
  length: number;
  loading: boolean;
  onComplete: (value: string) => void;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.SyntheticEvent<EventTarget & HTMLInputElement>) => void;
  splitNumber?: number;
}
