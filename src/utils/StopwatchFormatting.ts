export const StopwatchFormatting = (time: number) =>
  `${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${(
    "0" + Math.floor((time / 1000) % 60)
  ).slice(-2)}`;
