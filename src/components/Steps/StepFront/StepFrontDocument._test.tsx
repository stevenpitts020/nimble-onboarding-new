/*
import React from "react";
import { waitFor, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import StepFrontDocument from "./StepFrontDocument";
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
        <StepFrontDocument {...rest} />
      </Route>
    </OnboardingStepHelper>
  );
};

describe("<StepFrontDocument />", () => {
  test("renders step title", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithRouter(app(props), { route: "/onboarding/front" });
    });

    expect(
      screen.getByText("We need to verify your identity")
    ).toBeInTheDocument();
  });

  test("renders no camera msg", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithRouter(app(props), {
        route: "/onboarding/front?camera-active",
      });
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
      renderWithRouter(app(props), {
        route: "/onboarding/front?camera-active",
      });
    });

    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  test.skip("renders msg if using camera-active in params", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithRouter(app(props), {
        route: "/onboarding/front?camera-active",
      });
    });
    // how do we mock react-cam component ?
    expect(screen.getByText(/automatically scan your ID/)).toBeInTheDocument();
  });
});
*/
