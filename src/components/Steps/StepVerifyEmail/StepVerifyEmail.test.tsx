import React from "react";
import { Route } from "react-router-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
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

  describe("when clicking on the Resend Email button", () => {
    it("show sent email message", async () => {
      const props = {
        prospectProviderProps: {
          ...prospectState,
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

      const button = screen.getByRole("button", { name: /Resend Email/i });
      fireEvent.click(button);

      await waitFor(() => {
        const element = screen.getByText(/Sent!/);
        expect(element).toBeInTheDocument();
      });
    });

    it("show sent email failure message if there was a problem", async () => {
      const props = {
        prospectProviderProps: {
          ...prospectState,
          signerId: "00000000-9999-aaaa-0000-2ea08a01e903",
        },
      };
      renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

      const button = screen.getByRole("button", { name: /Resend Email/i });
      fireEvent.click(button);

      await waitFor(() => {
        const element = screen.getByText(
          /Sorry, there was a problem sending the email. Please try again later./
        );
        expect(element).toBeInTheDocument();
      });
    });

    it("should show message if missing id in state", async () => {
      const props = {
        prospectProviderProps: {
          status: "success",
          ...prospectState,
          signerId: undefined,
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

      const button = screen.getByRole("button", { name: /Resend Email/i });
      fireEvent.click(button);

      await waitFor(() => {
        const element = screen.getByText(
          /Sorry, there was a problem sending the email. Please try again later./
        );
        expect(element).toBeInTheDocument();
      });
    });

    it("should show message if id is empty in state", async () => {
      const props = {
        prospectProviderProps: {
          status: "success",
          ...prospectState,
          signerId: "",
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

      const button = screen.getByRole("button", { name: /Resend Email/i });
      fireEvent.click(button);

      await waitFor(() => {
        const element = screen.getByText(
          /Sorry, there was a problem sending the email. Please try again later./
        );
        expect(element).toBeInTheDocument();
      });
    });

    it("should show message if token is empty in state", async () => {
      const props = {
        prospectProviderProps: {
          status: "success",
          ...prospectState,
          securityToken: undefined,
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

      const button = screen.getByRole("button", { name: /Resend Email/i });
      fireEvent.click(button);

      await waitFor(() => {
        const element = screen.getByText(
          /Sorry, there was a problem sending the email. Please try again later./
        );
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe("when clicking on the Finish Request button", () => {
    it("redirects to next step", async () => {
      const props = {
        prospectProviderProps: {
          ...prospectState,
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/verify-email" });

      const button = screen.getByRole("button", { name: /Finish Request/i });
      fireEvent.click(button);

      await waitFor(() => {
        const element = screen.getByText(/Success/);
        expect(element).toBeInTheDocument();
      });
    });
  });
});
