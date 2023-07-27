import React from "react";
import { waitFor, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import StepInstructionsInvitees from "./StepInstructionsInvitees";
import renderWithReactRouter from "../../../support/router/renderWithReactRouter";
import OnboardingStepHelper from "../../../support/OnboardingStepHelper";

const app = (props: any) => {
  const providerProps = {
    prospectProviderProps: {
      status: "idle",
    },
    documentProviderProps: {},
    institutionProviderProps: {},
  };
  return (
    <OnboardingStepHelper providerProps={providerProps}>
      <Route path="/onboarding/:accountRequestId/signers/:signerId">
        <StepInstructionsInvitees {...props} />
      </Route>
      <Route path="*">
        <div>Do you wish to onboard other applicants right now or later?</div>
      </Route>
    </OnboardingStepHelper>
  );
};
describe("StepInstructionsInvitees", () => {
  test("show Signer name from url", async () => {
    const invitedByName = "Michael";

    const props = {
      className: "ni-test",
    };

    await waitFor(() => {
      renderWithReactRouter(app(props), {
        // tslint:disable-next-line: max-line-length
        route: `/onboarding/2321-sds3-242s-jhj3/signers/00000000-9999-aaaa-0000-2ea08a01e903?name=
        ${invitedByName}&token=123`,
      });
    });

    const container = screen.getByTestId("StepInstructions");
    expect(container).toBeInTheDocument();

    const name = await screen.findByText(/Michael/i);
    expect(name).toBeInTheDocument();
  });

  test("show error if broken token", async () => {
    const invitedByName = "Michael";

    const props = {
      className: "ni-test",
    };

    await waitFor(() => {
      renderWithReactRouter(app(props), {
        // tslint:disable-next-line: max-line-length
        route: `/onboarding/2321-sds3-242s-jhj3/signers/00000000-9999-aaaa-0000-2ea08a01e903?name=${invitedByName}`,
      });
    });

    const container = screen.getByTestId("StepInstructions");
    expect(container).toBeInTheDocument();

    const name = await screen.findByText(
      /Some information about your application is missing./i
    );
    expect(name).toBeInTheDocument();
  });

  test("redirect to already complete if signer has signed", async () => {
    const invitedByName = "Michael";

    const props = {
      className: "ni-test",
    };
    await waitFor(() => {
      renderWithReactRouter(app(props), {
        route: `/onboarding/2321-sds3-242s-jhj3/signers/xxx?name=${invitedByName}&token=123`,
      });
    });

    expect(
      await screen.findByText(
        "Do you wish to onboard other applicants right now or later?"
      )
    ).toBeInTheDocument();
  });
});
