import React from "react";
import "./Checkbox.sass";
import { ICheckbox } from "./types";

const Checkbox: React.FC<ICheckbox> = (props) => (
  <label>
    <div className={["ni-checkbox", props.className || ""].join(" ")}>
      <input type="checkbox" {...props} id={props.id} data-testid="checkbox" />
      <div className={props.checked ? "checkbox checked" : "checkbox"}>
        <svg>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  </label>
);
export default Checkbox;
