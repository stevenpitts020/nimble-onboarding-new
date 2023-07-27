import { ReactNode } from "react";

export interface IPersonalInfoItem {
  title: string;
  data: Array<{
    key: string;
    label: string;
    value: string;
    disabled?: boolean;
  }>;
}

export interface IPersonalInfo {
  personalInfo: Array<IPersonalInfoItem>;
  onChangePersonalDetailsHandler: (key: string, value: string) => void;
}

export type IAction = any;

export interface IProvider {
  children: ReactNode;
}
