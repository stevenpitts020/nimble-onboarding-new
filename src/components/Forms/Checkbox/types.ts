import React from "react";

export interface ICheckbox {
  id: string;
  name: string;
  checked?: boolean;
  className?: string;
  iconType?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tabIndex?: number;
}
