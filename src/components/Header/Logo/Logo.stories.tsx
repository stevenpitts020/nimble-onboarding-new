import React from "react";
import { action } from "@storybook/addon-actions";
import Logo from "./Logo";

export default {
  title: "Header/Logo",
  component: Logo,
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

export const Simple = () => <Logo url="/mocks/company.png" alt="some text" />;

export const WithMaxWith = () => (
  <Logo url="/mocks/company.png" width="100px" alt="some text" />
);

export const WithOnClick = () => (
  <Logo url="/mocks/company.png" alt="some text" onClick={action("clicked")} />
);
