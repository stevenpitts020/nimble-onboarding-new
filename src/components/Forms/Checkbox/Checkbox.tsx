import React from "react";
import clsx from "clsx";
import { ReactComponent as CheckboxIcon } from "./img/checkbox.svg";
import { ReactComponent as CheckedIcon } from "./img/checked.svg";
import { ReactComponent as CheckboxSquereIcon } from "./img/checkbox-squere.svg";
import { ReactComponent as CheckedSquereIcon } from "./img/checkbox-squere-checked.svg";
import "./Checkbox.sass";
import { ICheckbox } from "./types";

const getCheckboxIcon = (type: string, checked?: boolean) => {
  if (checked) {
    return type === "squere" ? <CheckedSquereIcon /> : <CheckedIcon />;
  }
  return type === "squere" ? <CheckboxSquereIcon /> : <CheckboxIcon />;
};

const Checkbox: React.FC<ICheckbox> = (props) => (
  <label>
    <div className={clsx("ni-checkbox", props.className)}>
      <input
        tabIndex={props.tabIndex}
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
        id={props.id}
        data-testid="checkbox"
      />
      {getCheckboxIcon(props.iconType || "round", props.checked)}
    </div>
  </label>
);
export default Checkbox;
