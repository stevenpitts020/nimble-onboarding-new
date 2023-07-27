import React from "react";
import NoCameraMessage from "./NoCameraMessage";

export default {
  title: "Content/Camera/NoCameraMessage",
  component: NoCameraMessage,
};

export const Simple = () => (
  <NoCameraMessage title="hello" url="http://localhost:3000" />
);

// tslint:disable-next-line: max-line-length
export const WithMessage = () => (
  <NoCameraMessage title="hello" url="http://localhost:3000">
    <p>This is a message.</p>
  </NoCameraMessage>
);

export const WithSize = () => (
  <NoCameraMessage title="hello" url="http://localhost:3000" size={320} />
);
