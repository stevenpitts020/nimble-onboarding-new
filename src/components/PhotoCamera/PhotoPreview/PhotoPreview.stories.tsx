import React from "react";
import PhotoPreview from "./PhotoPreview";

export default {
  title: "Content/Camera/PhotoPreview",
  component: PhotoPreview,
};

export const WithImage = () => (
  <PhotoPreview alt="Hello" imageData="logo192.png" />
);
