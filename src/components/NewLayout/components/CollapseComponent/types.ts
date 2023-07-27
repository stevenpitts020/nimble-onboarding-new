import React from "react";

export interface ICollapse {
  data: ICollapseElement[];
  className?: string;
  itemClassName?: string;
}

export interface ICollapseElement {
  id: string;
  label?: string;
  collapseElement: string | React.ReactNode;
  className?: string;
}
