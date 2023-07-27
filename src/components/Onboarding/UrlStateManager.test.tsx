import React from "react";
import { Router, useLocation } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UrlStateManager from "./UrlStateManager";
import {
  DocumentsProvider,
  useDocumentDispatch,
  uploadDocument,
} from "../../store/DocumentsContext";

import { UrlProvider } from "../../store/UrlContext";
import { ConsentsProvider } from "../../store";

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

describe("UrlStateManager reloads", () => {
  const App = () => {
    const dispatch = useDocumentDispatch();
    const { pathname } = useLocation();

    const upload = async () => {
      await uploadDocument(dispatch, "xpto1", "front", "institutionidmock");
    };
    const simulateReload = () => {
      dispatch({ type: "reset" });
    };

    return (
      <>
        <UrlStateManager />
        <button data-testid="create" type="button" onClick={upload}>
          Upload Front
        </button>
        <button onClick={simulateReload}>Simulate Reload</button>
        <div data-testid="currentLocation">{pathname}</div>
      </>
    );
  };

  test("should go back to the start", async () => {
    sessionStorage.setItem("startUrl", "/onboarding");

    renderWithReactRouter(
      <UrlProvider>
        <DocumentsProvider>
          <ConsentsProvider>
            <App />
          </ConsentsProvider>
        </DocumentsProvider>
      </UrlProvider>,
      {
        route: "/onboarding/selfie",
      }
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Upload Front/));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Simulate Reload/));
    });

    await waitFor(() => {
      const location = screen.getByTestId("currentLocation").textContent;
      expect(location).toEqual("/onboarding");
    });
  });

  test("should go back to the start and save params for Invitee onboarding ", async () => {
    sessionStorage.setItem(
      "startUrl",
      "/onboarding/some-account-request-id/signers/some-signer-id"
    );

    renderWithReactRouter(
      <UrlProvider>
        <DocumentsProvider>
          <ConsentsProvider>
            <App />
          </ConsentsProvider>
        </DocumentsProvider>
      </UrlProvider>,
      {
        route: "/onboarding/selfie",
      }
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Upload Front/));
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText(/Simulate Reload/));
    });

    await waitFor(() => {
      const location = screen.getByTestId("currentLocation").textContent;
      expect(location).toEqual(
        "/onboarding/some-account-request-id/signers/some-signer-id"
      );
    });
  });
});
