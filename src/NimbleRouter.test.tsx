import React from "react";
import { Route, Switch } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import renderWithReactRouter from "./support/router/renderWithReactRouter";
import NimbleRouter from "./NimbleRouter";
import NoMatch from "./components/Static/404/NoMatch";

describe("<NimbleRouter />", () => {
  it("renders 404 when no client domain is provided", async () => {
    const { getByText } = renderWithReactRouter(
      <Switch>
        <Route exact path="/404" component={NoMatch} />
        <Route>
          <NimbleRouter />
        </Route>
      </Switch>
    );

    await waitFor(() => {
      expect(
        getByText(/This probably isn't the page you are looking for/)
      ).toBeInTheDocument();
    });
  });

  it("renders 404 when unable to fetch institution", async () => {
    const { findByText } = renderWithReactRouter(
      <Switch>
        <Route exact path="/404" component={NoMatch} />
        <Route path="/:clientDomain">
          <title>foo</title>
          <NimbleRouter />
        </Route>
      </Switch>,
      { route: "/somedomain.com" }
    );

    await findByText(/This probably isn't the page you are looking for/);
  });

  it("renders content within nimble router", async () => {
    const { findByText } = renderWithReactRouter(
      <Switch>
        <Route exact path="/404" component={NoMatch} />
        <Route path="/:clientDomain">
          <NimbleRouter>
            <title>foo</title>I am inside the nimble router
          </NimbleRouter>
        </Route>
      </Switch>,
      { route: "/wearesingular.com" }
    );

    await findByText(/I am inside the nimble router/);
  });
});
