import React from "react";
import ErrorMessage from "./ErrorMessage";

export default {
  title: "Forms/ErrorMessage",
  component: ErrorMessage,
  decorators: [
    (storyFn: any) => (
      <div className="mainContainer_wrapper u-margin-top-xl">
        <div className="mainContainer">{storyFn()} </div>
      </div>
    ),
  ],
};

export const Simple = () => (
  <ErrorMessage errors={{ message: "Test error message" }} />
);
