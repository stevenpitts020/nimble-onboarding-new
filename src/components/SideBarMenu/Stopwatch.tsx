import React, { useEffect, useState } from "react";
import { StopwatchFormatting } from "../../utils/StopwatchFormatting";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const running = true;
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <div className="mt-4 flex justify-center">
      <span className="font-inter text-sm text-grayDarker">
        {`${StopwatchFormatting(time)} time in application`}
      </span>
    </div>
  );
};

export default Stopwatch;
