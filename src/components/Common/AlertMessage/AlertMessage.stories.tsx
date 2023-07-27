import React from "react";
import AlertMessage from "./AlertMessage";

export default {
  title: "Common/AlertMessage",
  component: AlertMessage,
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

export const Simple = () => <AlertMessage title="hello" />;
export const WithText = () => (
  <AlertMessage title="hello">This is an alarm!</AlertMessage>
);
