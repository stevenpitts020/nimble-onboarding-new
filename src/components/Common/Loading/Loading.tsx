import React from "react";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import animationData from "../../../animations/loading.json";
import defaultOptions from "../../../animations/options";

import "./loading.sass";
import { ILoading } from "./types";

const Loading: React.FC<ILoading> = ({
  width,
  height,
  text,
  fullPage,
  active,
}) => {
  if (!active) {
    return null;
  }
  const animationOptions = {
    ...defaultOptions,
    width,
    height,
    animationData,
  };
  return (
    <div
      className={fullPage ? "loading-cover" : "loading-square"}
      data-testid="loading-test"
    >
      <div style={{ width, height }}>
        <Lottie config={animationOptions} />
      </div>
      {text}
    </div>
  );
};

Loading.defaultProps = {
  text: "Loading ...",
  width: "200px",
  height: "200px",
};
export default Loading;
