import React, { useContext } from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UrlProvider, UrlContext } from "./UrlContext";

const renderWithReactRouter = (
  ui: any,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};

const TestingApp = () => {
  const { inviteeToken, isInvitedByName, currentStep } = useContext(UrlContext);
  return (
    <div>
      {inviteeToken && <span data-testid="token">{inviteeToken}</span>}
      {isInvitedByName && (
        <span data-testid="isInvitedByName">{isInvitedByName}</span>
      )}
      <span data-testid="currentStep">{currentStep}</span>
    </div>
  );
};

describe("UrlContext session storage actions", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should save startUrl to session Storage", async () => {
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route: "/onboarding" }
    );
    await waitFor(() => {
      const startUrl = sessionStorage.getItem("startUrl");
      expect(startUrl).toEqual("/onboarding");
    });
  });

  test("should save name of invited person and token to session Storage", async () => {
    const route =
      "/onboarding/some-prospect-id/signers/some-signerId?name=Ricardo&token=123";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const whoInvited = sessionStorage.getItem("isInvitedByName");
      const token = sessionStorage.getItem("inviteeToken");
      expect(token).toEqual("123");
      expect(whoInvited).toEqual("Ricardo");
    });
  });

  test("should save url with prospect id and signer id to session Storage", async () => {
    const route = "/onboarding/some-prospect-id/signers/some-signerId";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const startUrl = sessionStorage.getItem("startUrl");
      expect(startUrl).toEqual(route);
    });
  });
});

describe("UrlContext currentStep", () => {
  test("should set currentStep to back", async () => {
    const route = "/onboarding/back";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const currentStep = screen.getByTestId("currentStep");
      expect(currentStep).toHaveTextContent("back");
    });
  });

  test("should set currentStep to intro", async () => {
    const route = "/onboarding";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const currentStep = screen.getByTestId("currentStep");
      expect(currentStep).toHaveTextContent("intro");
    });
  });

  test("should set currentStep to intro with / as last symbol of route", async () => {
    const route = "/onboarding/";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const currentStep = screen.getByTestId("currentStep");
      expect(currentStep).toHaveTextContent("intro");
    });
  });

  test("should set currentStep to intro for invitee onboarding", async () => {
    const route =
      "/onboarding/some-prospect-id/signers/some-signerId?name=Ricardo&token=123";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const currentStep = screen.getByTestId("currentStep");
      expect(currentStep).toHaveTextContent("intro");
    });
  });

  test("should sanitize step", async () => {
    const route = '/onboarding/javascript:alert("hey user!")';
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const currentStep = screen.getByTestId("currentStep");
      expect(currentStep).toHaveTextContent("about:blank");
    });
  });
});

describe("UrlContext invitee Token", () => {
  test("should send token to children", async () => {
    const route =
      "/onboarding/some-prospect-id/signers/some-signerId?name=Ricardo&token=123";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const token = screen.getByTestId("token");
      expect(token).toHaveTextContent("123");
    });
  });

  test("should sanitize token", async () => {
    const route =
      '/onboarding/some-prospect-id/signers/some-signerId?name=Ricardo&token=javascript:alert("hey user!")';
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const token = screen.getByTestId("token");
      expect(token).toHaveTextContent("about:blank");
    });
  });

  test("should be null if no token in url", async () => {
    const route =
      "/onboarding/some-prospect-id/signers/some-signerId?name=Ricardo";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const token = screen.queryByTestId("token");
      expect(token).toBeNull();
    });
  });
});

describe("UrlContext isInvitedByName", () => {
  test("should send the name of who invited to children", async () => {
    const route =
      "/onboarding/some-prospect-id/signers/some-signerId?name=Ricardo&token=123";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const whoInvited = screen.getByTestId("isInvitedByName");
      expect(whoInvited).toHaveTextContent("Ricardo");
    });
  });
  test("should sanitize the name", async () => {
    const route =
      '/onboarding/some-prospect-id/signers/some-signerId?name=javascript:alert("hey user!")';
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const whoInvited = screen.getByTestId("isInvitedByName");
      expect(whoInvited).toHaveTextContent("about:blank");
    });
  });
  test("should be null if no name in url", async () => {
    const route =
      "/onboarding/some-prospect-id/signers/some-signerId?token=123";
    renderWithReactRouter(
      <UrlProvider>
        <TestingApp />
      </UrlProvider>,
      { route }
    );
    await waitFor(() => {
      const whoInvited = screen.queryByTestId("isInvitedByName");
      expect(whoInvited).toBeNull();
    });
  });
});
