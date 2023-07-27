import React from "react";
import Select from "react-select";
import "./SearchableDropdown.sass";
import { useUID } from "react-uid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { IProps } from "./types";

const SearchableDropdown = React.forwardRef<HTMLSelectElement, IProps>(
  (props: any) => {
    const viableOptions: Array<any> = [];
    for (let i = 0; i < props.options.length; i++) {
      const stateAbbreviation = props.options[i];
      viableOptions.push({
        value: stateAbbreviation,
        label: stateAbbreviation,
      });
    }

    const uid = useUID();
    return (
      <div style={{ width: "150px" }}>
        <div className="form-label">{props.label}</div>
        <div
          className={`form-group form-group-select ${props.className}`}
          data-testid={uid}
        >
          <ErrorMessage errors={props.errors} />
          <div className="form-fields">
            <Select
              options={viableOptions}
              name={props.name}
              defaultValue={{
                label: props.defaultValue,
                value: props.defaultValue,
              }}
              onChange={(option) => {
                if (option) {
                  props.onChange(option.value);
                }
              }}
              className="form"
            />
          </div>
        </div>
      </div>
    );
  }
);
export default SearchableDropdown;
