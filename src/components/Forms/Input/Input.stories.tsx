import React from "react";
import Input from "./Input";

export default {
  title: "Forms/Input",
  component: Input,
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

export const Simple = () => (
  <Input
    label="Email"
    name="email"
    errors={false}
    placeholder="Enter a email"
  />
);
export const WithError = () => (
  <Input label="Full Name" name="fullName" errors={{ message: "oops" }} />
);
export const Disabled = () => (
  <Input label="Full Name" name="fullName" disabled />
);
export const NoLabel = () => (
  <Input name="address" placeholder="Address" disabled />
);
