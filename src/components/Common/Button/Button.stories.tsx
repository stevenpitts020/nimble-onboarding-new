import React from "react";
import { action } from "@storybook/addon-actions";
import { ArrowRight } from "react-feather";
import Button from "./Button";

export default {
  title: "Common/Button",
  component: Button,
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

export const Basic = () => <Button>Hello</Button>;
export const Block = () => <Button block>Block</Button>;
export const Loading = () => <Button loading>Continue</Button>;
export const Disabled = () => <Button disabled>Continue</Button>;
export const OnClick = () => (
  <Button onClick={action("clicked")}>Continue</Button>
);

export const Pill = () => (
  <Button className="is-pill" onClick={action("clicked")}>
    <ArrowRight />
    Skip
  </Button>
);

export const GreenPill = () => (
  <Button className="is-pill is-green" onClick={action("clicked")}>
    <ArrowRight />
    Skip
  </Button>
);
