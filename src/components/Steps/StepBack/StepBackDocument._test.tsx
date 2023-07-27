/*
import React from "react";
import { waitFor, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import StepBackDocument from "./StepBackDocument";
import renderWithRouter from "../../../support/router/renderWithRouter";
import OnboardingStepHelper from "../../../support/OnboardingStepHelper";

const app = (props: any) => {
  const { documentProviderProps, ...rest } = props;

  const providerProps = {
    prospectProviderProps: {},
    documentProviderProps: {
      ...documentProviderProps,
    },
    institutionProviderProps: {},
  };
  return (
    <OnboardingStepHelper providerProps={providerProps}>
      <Route path="*">
        <StepBackDocument {...rest} />
      </Route>
    </OnboardingStepHelper>
  );
};

describe("<StepBackDocument />", () => {
  test("renders step title", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithRouter(app(props), { route: "/onboarding/back" });
    });

    expect(
      screen.getByText(
        "Please make sure that the barcode is visible and readable."
      )
    ).toBeInTheDocument();
  });

  test("renders no camera msg", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithRouter(app(props), { route: "/onboarding/back?camera-active" });
    });

    expect(
      screen.getByText("We need a camera to scan your ID")
    ).toBeInTheDocument();
  });

  test("renders alert msg", async () => {
    const props = {
      documentProviderProps: {
        status: "failure",
        error: "Network error",
      },
    };
    // because of useEffect
    await waitFor(() => {
      renderWithRouter(app(props), { route: "/onboarding/back" });
    });

    expect(screen.getByText("Network error")).toBeInTheDocument();
  });
});
*/
