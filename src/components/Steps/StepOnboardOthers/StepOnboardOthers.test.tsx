import React from "react";
import { Route } from "react-router-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import StepOnboardOthers from "./StepOnboardOthers";
import {
  prospectSignerSigned,
  prospectSignerInvited,
} from "../../../services/__mocks__/Signer";
import renderWithReactRouter from "../../../support/router/renderWithReactRouter";
import OnboardingStepHelper from "../../../support/OnboardingStepHelper";

const currentSigner = {
  firstName: "John",
  middleName: "JAMES",
  lastName: "BROWN",
  dateOfBirth: "1988-01-28",
  phoneNumber: "(242) 342-3423",
  email: "john.mf.mcclane@wearesingular.com",
  address: "2405 148TH CT",
  city: "URBANDALE",
  state: "IA",
  zipCode: "50323",
  employer: "Sing",
  ssn: "324-32-4234",
  documentNumber: "529YY2415",
  documentExpirationDate: "2021-01-28",
  documentIssuedDate: "2016-08-12",
  consent: true,
  documentIssuer: "IA",
};

const app = (props: any) => (
  <OnboardingStepHelper providerProps={props}>
    <Route path="/onboarding/:accountRequestId/signers/:signerId">
      <p data-testid="StepOnboarding">This is onboarding for other.</p>
    </Route>
    <Route path="/onboarding/success">
      <p data-testid="StepSuccess">
        Do you wish to onboard other applicants right now or later?
      </p>
    </Route>
    <Route path="/onboarding/other-applicants" component={StepOnboardOthers} />
  </OnboardingStepHelper>
);

beforeEach(() => {
  window.sessionStorage.clear();
  jest.restoreAllMocks();
  sessionStorage.setItem(
    "invitees",
    JSON.stringify([
      {
        id: "4e21c736-3e59-4acd-8b58-6091832e656b",
        email: "joao+2@gmail.com",
        role: "SECONDARY",
      },
      {
        id: "00000000-9999-aaaa-0000-2ea08a01e903",
        email: "signer-invited03@nimblefi.com",
        role: "SECONDARY",
      },
    ])
  );
});

afterEach(() => {
  window.sessionStorage.clear();
  jest.restoreAllMocks();
});

describe("StepOnboardOthers", () => {
  const prospectState = {
    accountRequestId: "xpto",
    invitedBy: {
      firstName: currentSigner.firstName,
      email: currentSigner.email,
      id: "123",
    },
    securityToken: "somethingsomething",
  };

  test("renders without error", async () => {
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    await waitFor(() => {
      const element = screen.getByText(
        "Do you wish to onboard other applicants right now or later?"
      );
      expect(element).toBeInTheDocument();
    });
  });

  test("should show the current signer from sessionStorage", async () => {
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    await waitFor(() => {
      expect(screen.getByTestId("currentSigner").textContent).toEqual(
        `${currentSigner.firstName}Complete`
      );
    });
  });

  test("should show invitees from API (signed or not)", async () => {
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      // 2 from api + 1 currentSigner from sessionStorage
      expect(listItems).toHaveLength(2);
      // first from api is signed
      expect(listItems[0].textContent).toEqual(
        `${prospectSignerSigned.firstName}Complete`
      );
      // second from api is invited, see handler.js
      expect(listItems[1].textContent).toEqual(
        `${prospectSignerInvited.email}Start Now`
      );
    });
  });

  test("should allow onboarding for non signed invitees", async () => {
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Start Now/i });
      fireEvent.click(button);
    });
    await waitFor(() => {
      const container = screen.getByTestId("StepOnboarding");
      expect(container).toBeInTheDocument();
    });
  });

  test("should skip to sucess if everyone signed", async () => {
    // random users
    window.sessionStorage.setItem(
      "invitees",
      JSON.stringify([
        {
          id: "4e21c736-3e59-4acd-8b58-6091832e656b",
          email: "joao+2@gmail.com",
          role: "SECONDARY",
        },
        {
          id: "4e21c736-3e59-4acd-8b58-6091832e656b",
          email: "joao+2@gmail.com",
          role: "SECONDARY",
        },
        {
          id: "4e21c736-3e59-4acd-8b58-6091832e656b",
          email: "joao+2@gmail.com",
          role: "SECONDARY",
        },
      ])
    );
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    // should go to the success screen
    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();
    });
  });

  test("should skip to sucess if api returned error that everyone signed", async () => {
    // random users
    window.sessionStorage.setItem(
      "invitees",
      JSON.stringify([
        {
          id: "412",
          email: "412@wearesingular.com",
          role: "SECONDARY",
        },
        {
          id: "412",
          email: "412@wearesingular.com",
          role: "SECONDARY",
        },
      ])
    );
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    // should go to the success screen
    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();
    });
  });

  test("should skip to success if only 1 signer", async () => {
    // random users
    window.sessionStorage.setItem("invitees", JSON.stringify([]));
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });

    // should go to the success screen
    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();
    });
  });

  test("clicking on the Send invite to pending co-applicants should go to success", async () => {
    const props = {
      prospectProviderProps: {
        ...prospectState,
      },
    };
    renderWithReactRouter(app(props), {
      route: "/onboarding/other-applicants",
    });
    await waitFor(() => {
      const button = screen.getByTestId("go-to-success");
      fireEvent.click(button);
    });
    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();
    });
  });
});
