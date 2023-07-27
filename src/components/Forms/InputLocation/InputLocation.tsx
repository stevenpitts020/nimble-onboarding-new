import React, { useMemo } from "react";
import InputLocationView from "./InputLocationView";
import { IInputLocation } from "./types";
import useMapboxSearch from "../../../hooks/useMapboxSearch";
import { ReactComponent as HotkeyIcon1 } from "./icon/hotkey1.svg";
import { ReactComponent as HotkeyIcon2 } from "./icon/hotkey2.svg";
import { ReactComponent as HotkeyIcon3 } from "./icon/hotkey3.svg";

const HOTKEY_ICON = {
  [0]: HotkeyIcon1,
  [1]: HotkeyIcon2,
  [2]: HotkeyIcon3,
};

const InputLocation: React.FC<IInputLocation> = (props) => {
  const { onChange, value } = props;
  const { suggestions: autocomplete } = useMapboxSearch(value || "");

  const clues = useMemo(
    () =>
      autocomplete.slice(0, 3).map(({ name }, index) => {
        const Icon = HOTKEY_ICON[index];
        return {
          renderIcon: () => <Icon />,
          text: name,
          onSelect: () => onChange?.(name),
          hotkey: `${index + 1}`,
        };
      }),
    [autocomplete]
  );

  return <InputLocationView props={props} clues={clues} />;
};

export default InputLocation;
