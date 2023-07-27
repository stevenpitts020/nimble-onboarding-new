import React from "react";
import Input from "../NewInput/Input";
import { IInputLocationView } from "./types";
import { ReactComponent as LocationIcon } from "./location.svg";

const InputLocationView: React.FC<IInputLocationView> = ({
  props: { name, onChange, value, className },
  clues,
}) => (
  <Input
    classNameContainer={className}
    name={name}
    label="LOCATION"
    renderIcon={({ color }) => <LocationIcon fill={color} />}
    autoFocus
    clues={clues}
    value={value}
    onChange={(value) => onChange?.(value as string)}
  />
);

export default InputLocationView;
