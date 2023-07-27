import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Route } from "react-router-dom";
import StepInstructions from "./StepInstructions";
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
      <Route path="/onboarding/instructions">
        <StepInstructions {...props} />
      </Route>
      <Route path="*">
        <div>nextscreen</div>
      </Route>
    </OnboardingStepHelper>
  );
};

describe("StepInstructions", () => {
  test("renders without error", () => {
    const props = {
      className: "ni-test",
    };

    renderWithReactRouter(app(props), { route: "/onboarding/instructions" });

    const container = screen.getByTestId("StepInstructions");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");

    const element = screen.getByText(/Welcome/);
    expect(element).toBeInTheDocument();
  });

  test("show custom title", () => {
    const props = {
      title: "hello junior",
    };
    renderWithReactRouter(app(props), { route: "/onboarding/instructions" });

    const container = screen.getByText("hello junior");
    expect(container).toBeInTheDocument();
  });

  test("show error msg", async () => {
    const props = {
      error: "this is err",
    };
    renderWithReactRouter(app(props), { route: "/onboarding/instructions" });

    const container = screen.getByText("this is err");
    expect(container).toBeInTheDocument();
  });

  test("go to terms if you press go", async () => {
    const props = {};
    renderWithReactRouter(app(props), { route: "/onboarding/instructions" });

    fireEvent.click(screen.getByRole("button", { name: /go/i }));
    expect(await screen.findByText("nextscreen")).toBeInTheDocument();
  });
});
