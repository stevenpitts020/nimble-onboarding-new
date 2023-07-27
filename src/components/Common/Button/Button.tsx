import React from "react";
import "./button.sass";
import { ArrowRight } from "react-feather";
import { Ibutton } from "./types";

const Button: React.FunctionComponent<Ibutton> = ({
  className,
  children,
  onClick,
  loading,
  disabled,
  ...shared
}) => (
  <button
    {...shared}
    disabled={disabled}
    onClick={onClick}
    className={`button ${className}`}
  >
    {loading && <ArrowRight className="loading" />}
    {!loading && children}
  </button>
);

Button.defaultProps = {
  type: "button",
  className: "",
  loading: false,
  disabled: false,
};
export default Button;
