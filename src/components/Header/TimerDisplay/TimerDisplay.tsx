import React, { FC } from "react";
import "./timer.sass";
import Timer from "react-compound-timer";
import { ITimerDisplay } from "./types";

const TimerDisplay: FC<ITimerDisplay> = ({ className, twoDigits, style }) => (
  <div
    data-testid="timer"
    className={`ni-timer font-inter text-sm text-neutral50 ${className}`}
    style={style}
  >
    <small>Time Left:</small>
    <div className="timer font-semibold text-xl">
      <Timer
        initialTime={900000}
        direction="backward"
        startImmediately
        formatValue={twoDigits}
      >
        <p className="text-darkest leading-7">
          <span>
            <Timer.Minutes />
          </span>
          <span>:</span>
          <span>
            <Timer.Seconds />
          </span>
        </p>
      </Timer>
    </div>
  </div>
);
export default TimerDisplay;
