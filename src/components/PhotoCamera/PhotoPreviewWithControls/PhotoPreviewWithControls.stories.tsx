import React from "react";
import { action } from "@storybook/addon-actions";
import PhotoPreviewWithControls from "./PhotoPreviewWithControls";

export default {
  title: "Content/Camera/PhotoPreviewWithControls",
  component: PhotoPreviewWithControls,
};

export const WithImage = () => (
  <PhotoPreviewWithControls
    alt="Hello"
    imageData="logo192.png"
    onRepeat={action("clicked")}
    onContinue={action("clicked")}
  />
);

export const WithLoading = () => (
  <PhotoPreviewWithControls
    alt="Hello"
    loading
    imageData="logo192.png"
    onRepeat={action("clicked")}
    onContinue={action("clicked")}
  />
);
