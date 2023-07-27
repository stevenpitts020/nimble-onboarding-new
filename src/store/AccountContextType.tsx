import React from "react";

export interface IAccountContext {
  accountType: string;
  subItem: string;
  updateSubItem: (value: string) => void;
  updateAccountType: (value: string) => void;
}

export interface IProps {
  children: React.ReactNode;
}
