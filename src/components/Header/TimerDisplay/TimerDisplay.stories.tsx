import React from "react";
import TimerDisplay from "./TimerDisplay";

export default {
  title: "Header/TimerDisplay",
  component: TimerDisplay,
  decorators: [
    (storyFn: any) => (
      <div className="mainContainer_wrapper">
        <div className="mainContainer">
          <div className="w100">{storyFn()}</div>
        </div>
      </div>
    ),
  ],
};
const twoDigits = (value: number): string => {
  if (value > 10) {
    return `${value}`;
  }
  return `0${value}`;
};

export const Simple = () => <TimerDisplay twoDigits={twoDigits} />;
