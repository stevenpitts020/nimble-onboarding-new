import React from "react";
import { action } from "@storybook/addon-actions";
import PhotoCapture from "./PhotoCapture";

export default {
  title: "Content/Camera/PhotoCapture",
  component: PhotoCapture,
};

export const Simple = () => (
  <div style={{ width: "320px" }}>
    <PhotoCapture
      title="hello"
      width={200}
      height={200}
      onFlipCamera={action("clicked")}
      onTakePhoto={action("clicked")}
    />
  </div>
);
