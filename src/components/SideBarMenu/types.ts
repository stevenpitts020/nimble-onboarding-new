import React from "react";

export interface iSideBarMenu {
  classNames?: string;
  showTimer?: boolean;
  showTips?: boolean;
}

interface IIcon {
  stroke?: string;
}

export interface IItem {
  label: string;
  Icon?: React.FC<IIcon> | null;
  isOpen?: boolean;
  subItems?: IItem[];
  iconClass?: string;
  isActive?: boolean;
  isDone?: boolean;
  step?: string | string[];
  listItem?: boolean;
}

export interface ISideBarMenuSubItem extends IItem {
  index: number[];
  level?: number;
  onClick?: (indexes: number[]) => void;
  activeIndex: number[];
  isLastElement?: boolean;
}

export interface ISideBarMenuItem extends IItem {
  index: number[];
  onClick?: (indexes: number[]) => void;
  activeIndex: number[];
}
export interface IFaq {
  key?: number;
  label: string;
  subItems?: IItem[];
  position?: number;
}
