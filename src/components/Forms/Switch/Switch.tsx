import React, { useEffect } from "react";
import ReactSwitch from "react-switch";
import "./Switch.sass";
import { ISwitch } from "./types";
import Label from "../Label/Label";

const Switch: React.FC<ISwitch> = (props) => {
  const {
    name,
    label = "",
    textOn = "",
    textOff = "",
    valueOn,
    valueOff,
    onChange,
    disabled = false,
  } = props;

  const [isChecked, setIsChecked] = React.useState(props.isChecked || false);
  const value = isChecked ? valueOn : valueOff;

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleClickTextOff = () => {
    if (disabled) {
      return;
    }
    setIsChecked(textOn ? false : !isChecked);
  };

  const handleClickTextOn = () => {
    if (disabled) {
      return;
    }
    setIsChecked(textOff ? true : !isChecked);
  };

  const classes = [
    "switch-wrap",
    isChecked ? "checked" : "not-checked",
    disabled ? "disabled" : "enabled",
  ];

  return (
    <div className="form-group switch">
      <div className="form-fields">
        <Label for={name}>{label}</Label>
        <div className={classes.join(" ")}>
          {textOff && (
            <div
              className={`form-help ${disabled ? "disabled" : ""}`}
              onClick={handleClickTextOff}
              data-testid={`Switch-${name}-labelOff`}
            >
              {textOff}
            </div>
          )}
          <ReactSwitch
            onChange={setIsChecked}
            checked={isChecked}
            disabled={disabled}
            uncheckedIcon={false}
            checkedIcon={false}
            height={24}
            width={48}
            handleDiameter={16}
          />
          {textOn && (
            <div
              className={`form-help ${disabled ? "disabled" : ""}`}
              onClick={handleClickTextOn}
              data-testid={`Switch-${name}-labelOn`}
            >
              {textOn}
            </div>
          )}
        </div>
        <input
          ref={props.forwardRef}
          type="hidden"
          name={name}
          value={isChecked ? valueOn : valueOff}
        />
      </div>
    </div>
  );
};
export default Switch;
