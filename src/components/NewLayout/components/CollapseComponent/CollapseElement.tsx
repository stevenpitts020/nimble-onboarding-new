import React from "react";
import { ICollapseElement } from "./types";
import useCollapse from "react-collapsed";
import { ReactComponent as CollapseIcon } from "./Collapse.svg";
import clsx from "clsx";

const CollapseElement: React.FC<ICollapseElement> = ({
  label,
  collapseElement,
  className,
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    hasDisabledAnimation: true,
  });

  return (
    <div className={"ni-toggle-collapse-element"}>
      <div {...getToggleProps()} className={"ni-toggle-collapse-element-label"}>
        {label}
        <CollapseIcon className={clsx("collapse-icon", isExpanded && "open")} />
      </div>
      <div
        {...getCollapseProps()}
        className={clsx("ni-toggle-collapse-element-collapsed", className)}
      >
        {collapseElement}
      </div>
    </div>
  );
};

export default CollapseElement;
