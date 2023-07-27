import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { UrlProvider } from "./store/UrlContext";

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

test("App should display onboarding step 1", async () => {
  const { getByTestId } = renderWithReactRouter(<App />);

  await waitFor(() => {
    expect(getByTestId("app")).toBeInTheDocument();
  });
});

test("landing on a bad page shows 404 page", async () => {
  const { getByText } = renderWithReactRouter(<App />, { route: "/some/path" });

  await waitFor(() => {
    const linkElement = getByText(
      /This probably isn't the page you are looking for/
    );
    expect(linkElement).toBeInTheDocument();
  });
});

test("on step 0 class name of main should be step-intro", async () => {
  const { getByTestId } = renderWithReactRouter(
    <UrlProvider>
      <App />
    </UrlProvider>
  );

  await waitFor(() => {
    expect(getByTestId("main")).toHaveClass("step-intro");
  });
});

test("on Step Personal Info class name of main should be step-personal-info", async () => {
  const { getByTestId } = renderWithReactRouter(
    <UrlProvider>
      <App />
    </UrlProvider>,
    { route: "/personal-info" }
  );

  await waitFor(() => {
    expect(getByTestId("main")).toHaveClass("step-personal-info");
  });
});
export default renderWithReactRouter;
