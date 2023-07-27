import React, { useCallback } from "react";
import Timer from "react-compound-timer";

const FooterTimer = () => {
  const twoDigits = useCallback((value: number): string => {
    return value >= 10 ? value.toString() : `0${value}`;
  }, []);

  return (
    <div data-testid="timer" className="font-inter text-sm text-neutral50">
      <p className="text-sm text-manatee">Elapsed Time:</p>
      <div className="text-base">
        <Timer
          startImmediately
          initialTime={
            sessionStorage.getItem("timer")
              ? Number(sessionStorage.getItem("timer"))
              : 12000
          }
          formatValue={twoDigits}
        >
          {({ getTime }) => {
            sessionStorage.setItem("timer", getTime());
            return (
              <p className="text-darkest font-semibold leading-7">
                <span>
                  <Timer.Minutes />
                </span>
                <span>:</span>
                <span>
                  <Timer.Seconds />
                </span>
              </p>
            );
          }}
        </Timer>
      </div>
    </div>
  );
};
export default FooterTimer;
