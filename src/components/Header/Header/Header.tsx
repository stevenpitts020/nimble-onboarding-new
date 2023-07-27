import React, { FC, useCallback } from "react";
import HeaderView from "./HeaderView";
import { IHeader } from "./types";
import { useLayoutContext } from "../../../store/LayoutContext";

const Header: FC<IHeader> = (props) => {
  const twoDigits = useCallback((value: number): string => {
    return value >= 10 ? value.toString() : `0${value}`;
  }, []);

  const { showTimer, showLogoHeader } = useLayoutContext();

  return (
    <>
      {(showTimer || showLogoHeader) && (
        <HeaderView
          props={props}
          twoDigits={twoDigits}
          showTimer={showTimer}
          hideLogo={!showLogoHeader}
        />
      )}
    </>
  );
};

export default Header;
