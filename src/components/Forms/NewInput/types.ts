import React from "react";

interface IRenderIconProps {
  isFocused: boolean;
  color: string;
}

type TRefInput = React.MutableRefObject<HTMLInputElement | null>;

interface IRenderInputProps {
  ref: TRefInput;
  className: string;
  placeholder?: string;
  autoFocus?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onKeyDown: (e: React.SyntheticEvent<EventTarget & HTMLInputElement>) => void;
  name?: string;
  isFromCacheValue?: boolean;
}

export interface IInput {
  renderIcon?: (props: IRenderIconProps) => React.ReactNode;
  renderInput?: (props: IRenderInputProps) => React.ReactNode;
  example?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  autoFocus?: boolean;
  clues?: IClue[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  classNameContainer?: string;
  cluesClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  tooltip?: string;
  isFromCache?: boolean;
  error?: boolean;
}

export interface IInputView {
  props: IInput;
  inputRef: TRefInput;
  onClickInput: (e: React.MouseEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  onKeyDown: (e: React.SyntheticEvent<EventTarget & HTMLInputElement>) => void;
  onChange?: (value: string | number) => void;
  isFromCache?: boolean;
  error?: boolean;
}

export interface IClue {
  renderIcon: () => React.ReactNode;
  text: string | (() => React.ReactNode);
  type?: "info" | "error";
  onSelect?: () => void;
  show?: boolean;
  id?: string;
  hotkey?: string;
}

export interface IClueProps extends IClue {
  isLast: boolean;
}

export interface IClueList {
  clues: IClue[];
  className?: string;
  isFocused: boolean;
}

export interface ITooltip {
  text: string;
  isValid?: boolean;
  value?: number | string;
}
