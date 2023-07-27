import React from "react";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import ExitLogo from "../ExitLogo/ExitLogo";
import { IHeaderView } from "./types";

const HeaderView = ({ props, showTimer, hideLogo, twoDigits }: IHeaderView) => (
  <header
    data-testid="header"
    className={`ni-header mt-4 mr-16 ${props.className}`}
    style={props.style}
  >
    <div className="flex flex-1 justify-center">
      {!hideLogo && <ExitLogo className="w-72" />}
    </div>
    {showTimer && <TimerDisplay twoDigits={twoDigits} />}
  </header>
);

export default HeaderView;
