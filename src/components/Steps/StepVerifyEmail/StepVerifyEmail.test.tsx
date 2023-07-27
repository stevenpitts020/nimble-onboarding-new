import React from "react";
import { Route } from "react-router-dom";
import { screen } from "@testing-library/react";
import StepVerifyEmail from "./StepVerifyEmail";
import { postToCreateProspectSuccess } from "../../../services/__mocks__/Signer";
import renderWithReactRouter from "../../../support/router/renderWithReactRouter";
import OnboardingStepHelper from "../../../support/OnboardingStepHelper";

const app = (props: any) => (
  <OnboardingStepHelper providerProps={props}>
    <Route path="/onboarding/other-applicants">
      <p>Success</p>
    </Route>
    <Route path="/onboarding/verify-email" component={StepVerifyEmail} />
    <Route path="/onboarding">
      <p>Missing Data</p>
    </Route>
  </OnboardingStepHelper>
);

describe("StepVerifyEmail", () => {
  const prospectState = {
    securityToken: "somethingsomething",
    signerId: postToCreateProspectSuccess.signer.id,
    signer: postToCreateProspectSuccess.signer,
  };

  beforeEach(() => {
    // mock token and url
    sessionStorage.setItem("invitees", JSON.stringify([]));
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("should show signer email", async () => {
    const props = {
      prospectProviderProps: {
        status: "success",
        ...prospectState,
      },
    };

    renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

    const element = screen.getByText(postToCreateProspectSuccess.signer.email);
    expect(element).toBeInTheDocument();
  });
});
