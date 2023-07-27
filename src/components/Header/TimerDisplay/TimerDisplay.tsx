import React, { FC } from "react";
import "./timer.sass";
import Timer from "react-compound-timer";
import { ITimerDisplay } from "./types";

const TimerDisplay: FC<ITimerDisplay> = ({ className, twoDigits, style }) => (
  <div data-testid="timer" className={`ni-timer ${className}`} style={style}>
    <small>Elapsed Time:</small>
    <div className="timer">
      <Timer startImmediately formatValue={twoDigits}>
        <span>
          <Timer.Minutes />
        </span>
        <span>:</span>
        <span>
          <Timer.Seconds />
        </span>
      </Timer>
    </div>
  </div>
);
export default TimerDisplay;
