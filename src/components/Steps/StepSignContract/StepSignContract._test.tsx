/*
import React from "react";
import { Route } from "react-router-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { embedURLSuccess } from "../../../services/__mocks__/Signer";
import { server, rest } from "../../../support/msw/server";
import Config from "../../../services/Config";
import renderWithReactRouter from "../../../support/router/renderWithReactRouter";
import OnboardingStepHelper from "../../../support/OnboardingStepHelper";
import StepSignContract from "./StepSignContract";

const app = (props: any) => (
  <OnboardingStepHelper providerProps={props}>
    <Route path="/onboarding/verify-email">
      <p>Success</p>
    </Route>
    <Route path="/onboarding/other-applicants">
      <p data-testid="StepOnboardOthers">
        Do you wish to onboard other applicants right now or later?
      </p>
    </Route>
    <Route path="/onboarding/sign-contract" component={StepSignContract} />
    <Route path="/onboarding">
      <p>start onboarding</p>
    </Route>
  </OnboardingStepHelper>
);

describe("StepSignContract", () => {
  describe("if contract is signed", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("redirects to Verify Email Screen", async () => {
      const props = {
        prospectProviderProps: {
          status: "success",
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/sign-contract" });

      const element = screen.getByText("Success");
      expect(element).toBeInTheDocument();
    });
  });

  describe("if contract is not signed", () => {
    const replaceMock = jest.fn();

    // delete window.location
    window.location.assign = replaceMock;

    afterEach(() => {
      replaceMock.mockClear();
      sessionStorage.clear();
    });

    it("renders a message if you press back from docusign", async () => {
      const props = {
        prospectProviderProps: {
          status: "idle",
          signer: {},
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/sign-contract" });

      const container = screen.getByTestId("StepSignContract");
      expect(container).toBeInTheDocument();

      const element = screen.getByText(
        "You need to sign the contract to finish your account opening"
      );
      expect(element).toBeInTheDocument();
    });

    it("renders a error message when returning from docusign", async () => {
      const props = {
        prospectProviderProps: {
          status: "idle",
          signer: {},
        },
      };

      renderWithReactRouter(app(props), {
        route: "/onboarding/sign-contract?event=ttl_expired",
      });

      const container = screen.getByTestId("StepSignContract");
      expect(container).toBeInTheDocument();

      const element = screen.getByText(
        "The session timed out. Please try again."
      );
      expect(element).toBeInTheDocument();
    });

    it("renders button to retry embed again", async () => {
      const props = {
        prospectProviderProps: {
          status: "idle",
          securityToken: "somethingsomething",
        },
      };

      // mock api fetch
      const apiURL = Config.coreAPI;
      server.use(
        rest.get(`${apiURL}/fakeapiurl`, async (req, res, ctx) =>
          res(ctx.status(200), ctx.json(embedURLSuccess))
        )
      );

      await waitFor(() => {
        renderWithReactRouter(app(props), {
          route: "/onboarding/sign-contract?event=decline",
        });
      });

      const container = screen.getByTestId("StepSignContract");
      expect(container).toBeInTheDocument();

      // get error msg
      const element = screen.getByText(/You declined to sign the contract./);
      expect(element).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Sign Contract/));

      // needs waitfor
      await waitFor(() => {
        expect(window.location.assign).toBeCalledWith(embedURLSuccess.url);
      });
    });

    it("redirects to onboarding start if missing token in session", async () => {
      const props = {
        prospectProviderProps: {
          status: "embedReady",
          signer: {},
        },
      };

      renderWithReactRouter(app(props), { route: "/onboarding/sign-contract" });

      const element = screen.getByText("start onboarding");
      expect(element).toBeInTheDocument();
    });
  });
});
*/
