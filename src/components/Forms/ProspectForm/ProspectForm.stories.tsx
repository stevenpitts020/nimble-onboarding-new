import React from "react";
import { action } from "@storybook/addon-actions";
import ProspectForm from "./ProspectForm";
import { validSigner } from "../../../services/__mocks__/Signer";

export default {
  title: "Forms/ProspectForm",
  component: ProspectForm,
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

const handleValidation = () => undefined;

export const Simple = () => <ProspectForm onValidate={handleValidation} />;

export const WithInitialValues = () => (
  <ProspectForm defaultValues={validSigner} onValidate={handleValidation} />
);

export const WithOnSubmit = () => (
  <ProspectForm
    defaultValues={validSigner}
    onValidate={handleValidation}
    onSubmit={action("clicked")}
  />
);
