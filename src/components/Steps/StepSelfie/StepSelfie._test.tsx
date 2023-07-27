/*
import React from "react";
import { Route } from "react-router-dom";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import "../../../support/enumeratedDevices.mock";
import StepSelfie from "./StepSelfie";
import renderWithReactRouter from "../../../support/router/renderWithReactRouter";
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
      <Route path="/onboarding/selfie">
        <StepSelfie {...rest} />
      </Route>
    </OnboardingStepHelper>
  );
};

describe("Step Selfie", () => {
  test("renders step title", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithReactRouter(app(props), { route: "/onboarding/selfie" });
    });
    await waitFor(() => {
      const container = screen.getByTestId("step-selfie");
      expect(container).toBeInTheDocument();
    });
  });

  // ??
  test("Check the number of cams in device", async () => {
    const numOfcamsInDevice =
      await global.window.navigator.mediaDevices.enumerateDevices();
    expect(numOfcamsInDevice).toHaveLength(1);
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
      renderWithReactRouter(app(props), { route: "/onboarding/selfie" });
    });

    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  test("renders no camera msg", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithReactRouter(app(props), { route: "/onboarding/selfie" });
    });

    expect(
      screen.getByText("We need a camera to scan your ID")
    ).toBeInTheDocument();
  });

  // jsdom does not render the camera
  // we need to mock Webcam
  test.skip("renders photo capture", async () => {
    const props = {
      documentProviderProps: {},
    };
    // because of useEffect
    await waitFor(() => {
      renderWithReactRouter(app(props), { route: "/onboarding/selfie" });
    });

    const element = screen.getByTestId("photoCapture");
    expect(element).toBeInTheDocument();

    // Click camera
    const button = screen.getByTestId("CaptureButton");
    fireEvent.click(button);
  });
});
*/
