/*
import React from "react";
import { Route } from "react-router-dom";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import StepSuccess from "./StepSuccess";
import StepPersonalInfo from "../StepPersonalInfo/StepPersonalInfo";
import { server, rest } from "../../../support/msw/server";
import Config from "../../../services/Config";
import { createSuccessResponse } from "../../../services/__mocks__/AccountRequest";
import renderWithReactRouter from "../../../support/router/renderWithReactRouter";
import OnboardingStepHelper from "../../../support/OnboardingStepHelper";

const app = (props: any) => (
  <OnboardingStepHelper providerProps={props}>
    <Route path="/onboarding/personal-info" component={StepPersonalInfo} />
    <Route path="/onboarding/sign-contract">
      <div>Embed Success</div>
    </Route>
    <Route path="/onboarding/other-applicants">
      <div>Other applications</div>
    </Route>
    <Route path="/onboarding/success" component={StepSuccess} />
  </OnboardingStepHelper>
);

describe("StepSuccess", () => {
  it("renders success message if status is idle", async () => {
    await waitFor(() => {
      renderWithReactRouter(
        app({
          prospectProviderProps: {
            status: "idle",
          },
        }),
        { route: "/onboarding/success" }
      );
    });

    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();

      const element = screen.getByText("Thank you for choosing Central Bank");
      expect(element).toBeInTheDocument();
    });
  });

  it("renders onboard others when there are invitees", async () => {
    sessionStorage.setItem(
      "invitees",
      JSON.stringify([
        {
          id: "4e21c736-3e59-4acd-8b58-6091832e656b",
          email: "joao+2@gmail.com",
          role: "SECONDARY",
        },
      ])
    );

    const props = {
      prospectProviderProps: {
        status: "success",
      },
    };

    await waitFor(() => {
      renderWithReactRouter(app(props), { route: "/onboarding/success" });
    });

    await waitFor(() => {
      const element = screen.getByText("Other applications");
      expect(element).toBeInTheDocument();
    });
    sessionStorage.clear();
  });

  describe("When generating a embed URL", () => {
    it("redirects to the embed url", async () => {
      const props = {
        prospectProviderProps: {
          status: "signerReady",
          invitees: [],
          products: [{ productId: "some-id" }],
        },
      };

      await waitFor(() => {
        renderWithReactRouter(app(props), { route: "/onboarding/success" });
      });
      // after sending data, status will transition to embedReady and then it goes to screen
      await waitFor(() => {
        const element = screen.getByText("Embed Success");
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe("When there is a problem", () => {
    // I think it no longer applies
    it("renders a error message if serious server returns error and lets user retry", async () => {
      const props = {
        prospectProviderProps: {
          status: "signerReady",
          products: [{ productId: "ERROR" }],
        },
      };

      await waitFor(() => {
        renderWithReactRouter(app(props), { route: "/onboarding/success" });
      });

      const element = await screen.findByTestId("error");
      expect(element).toBeInTheDocument();

      expect(
        await screen.findByText(
          /There was a problem while processing your account/
        )
      ).toBeTruthy();

      // change the mock to a success on 2nd try because using res.once request matches to this handler are ignored
      server.use(
        rest.post(`${Config.coreAPI}/account-requests`, async (req, res, ctx) =>
          res(ctx.status(200), ctx.json(createSuccessResponse))
        )
      );

      // I need to be able to avoid the last error in the mocks
      fireEvent.click(await screen.findByTestId("tryAgainButton"));
      expect(await screen.findByText("Embed Success")).toBeInTheDocument();
    });

    it("renders a error message if network error", async () => {
      const props = {
        prospectProviderProps: {
          status: "signerReady",
          products: [{ productId: "NETWORK" }],
        },
      };

      await waitFor(() => {
        renderWithReactRouter(app(props), { route: "/onboarding/success" });
      });

      const element = await screen.findByTestId("error");
      expect(element).toBeInTheDocument();

      expect(
        await screen.findByText(
          /There was a problem while processing your account/
        )
      ).toBeTruthy();
    });

    it("redirects to form if minor problem", async () => {
      const props = {
        prospectProviderProps: {
          status: "signerReady",
          products: [{ productId: "INVALID" }],
        },
      };

      await waitFor(() => {
        renderWithReactRouter(app(props), { route: "/onboarding/success" });
      });

      const element = await screen.findByTestId("StepPersonalInfo");
      expect(element).toBeInTheDocument();

      expect(await screen.findByText("Computer says no")).toBeTruthy();
    });

    it("renders a message if missing documents", async () => {
      const props = {
        prospectProviderProps: {
          status: "signerReady",
        },
        documentProviderProps: {
          status: "idle",
          documents: {
            selfie: { id: "somefrontid", file: "somefrontfile" },
            front: { id: "somefrontid", file: "somefrontfile" },
            back: {},
          },
        },
      };

      await waitFor(() => {
        renderWithReactRouter(app(props), { route: "/onboarding/success" });
      });

      await waitFor(() => {
        expect(screen.getByText("Personal Information")).toBeTruthy();
        expect(
          screen.getByText(
            "Some information about your Onboarding process is missing."
          )
        ).toBeTruthy();
      });
    });

    it("renders a message if missing prospect info", async () => {
      const props = {
        prospectProviderProps: {
          error: null,
          status: "signerReady",
          signer: {},
        },
      };

      await waitFor(() => {
        renderWithReactRouter(app(props), { route: "/onboarding/success" });
      });

      await waitFor(() => {
        const container = screen.getByTestId("StepPersonalInfo");
        expect(container).toBeInTheDocument();
        expect(
          screen.getByText(
            "Some information about your Onboarding process is missing."
          )
        ).toBeTruthy();
      });
    });
  });
});
*/
