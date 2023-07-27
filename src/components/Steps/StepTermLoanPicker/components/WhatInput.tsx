import React from "react";
import Input from "../../../Forms/NewInput/Input";
import { ReactComponent as BuildingsIcon } from "../icon/buildings.svg";
import { ReactComponent as HotkeyAIcon } from "../icon/hotkeyA.svg";
import { ReactComponent as HotkeyBIcon } from "../icon/hotkeyB.svg";
import { ReactComponent as HotkeyCIcon } from "../icon/hotkeyC.svg";
import { ReactComponent as BuildingsClueIcon } from "../icon/buildingsClue.svg";
import { ReactComponent as DepositClueIcon } from "../icon/depositClue.svg";
import { ReactComponent as CarClueIcon } from "../icon/carClue.svg";
import { ReactComponent as InfoIcon } from "../../../Forms/NewInput/icon/info.svg";

interface IWhatInput {
  onChange: (name: string) => void;
  value: string;
}

const WhatInput: React.FC<IWhatInput> = ({ onChange, value }) => {
  const clues = [
    {
      renderIcon: () => <InfoIcon />,
      text: "Use your keyboard to pick the option",
    },
    {
      renderIcon: () => <HotkeyAIcon />,
      text: () => (
        <div className="flex items-center">
          <BuildingsClueIcon className="mr-3" />
          Real Estate
        </div>
      ),
      hotkey: "a",
      onSelect: () => onChange("Real Estate"),
    },
    {
      renderIcon: () => <HotkeyBIcon />,
      text: () => (
        <div className="flex items-center">
          <DepositClueIcon className="mr-3" />
          Deposits
        </div>
      ),
      hotkey: "b",
      onSelect: () => onChange("Deposits"),
    },
    {
      renderIcon: () => <HotkeyCIcon />,
      text: () => (
        <div className="flex items-center">
          <CarClueIcon className="mr-3" />
          Vehicle / Other
        </div>
      ),
      hotkey: "c",
      onSelect: () => onChange("Vehicle / Other"),
    },
  ];

  return (
    <Input
      name="what"
      label="WHAT?"
      renderIcon={({ color }) => <BuildingsIcon fill={color} />}
      autoFocus
      clues={clues}
      value={value}
    />
  );
};

export default WhatInput;
