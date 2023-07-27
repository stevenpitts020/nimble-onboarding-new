import React from "react";
import { IProductOption } from "./types";

const ProductOption: React.FC<IProductOption> = (props) => {
  const option = props.option;
  return (
    <div
      key={option.key}
      className={`product-option-item ${props.className} ${
        props.isChildren ? "sub-option" : ""
      } ${
        option.annotation === "Can be ordered thru online banking"
          ? "no-option"
          : ""
      }`}
    >
      <div className="option_desc">
        <p>{option.title}</p>
        <span>{option.lead}</span>
      </div>
      {option.annotation !== "Can be ordered thru online banking" ? (
        <div className="switch-wrapper">
          <p className={`price ${option.annotation === "Free" ? "free" : ""}`}>
            {option.annotation}
          </p>
          <label className="switch">
            <input
              type="checkbox"
              name={option.key}
              onChange={props.handleChange}
              data-testid={`checkbox-${option.key}`}
              checked={option.value === "true"}
            />
            <span className="slider round" />
          </label>
        </div>
      ) : (
        <span className="annotation">{option.annotation}</span>
      )}
    </div>
  );
};
export default ProductOption;
