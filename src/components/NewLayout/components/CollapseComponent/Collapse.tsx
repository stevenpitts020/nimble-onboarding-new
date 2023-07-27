import React from "react";
import clsx from "clsx";
import { ICollapse } from "./types";
import CollapseElement from "./CollapseElement";
import "./Collapse.sass";

const Collapse: React.FC<ICollapse> = ({ data, className, itemClassName }) => {
  return (
    <div className={clsx("ni-toggle-collapse", className)}>
      {data.map((element) => (
        <CollapseElement
          key={element.id}
          {...element}
          className={itemClassName}
        />
      ))}
    </div>
  );
};

export default Collapse;
