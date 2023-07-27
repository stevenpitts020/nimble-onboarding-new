import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import NimbleRouter from "./NimbleRouter";
import { LoadingProvider } from "./store/LoadingContext";
import App from "./App";
import ErrorPage from "./components/Static/Error/Error";
import { UrlProvider } from "./store/UrlContext";
import NoMatch from "./components/Static/404/NoMatch";

const Main: React.FC = () => (
  <Router>
    <ErrorBoundary showDialog={false} fallback={ErrorPage}>
      <Switch>
        <Route exact path="/404" component={NoMatch} />
        <Route exact path="/">
          <Redirect to="/centralbankonline.com" />
        </Route>
        <Route path="/:clientDomain">
          <NimbleRouter>
            <LoadingProvider>
              <UrlProvider>
                <App />
              </UrlProvider>
            </LoadingProvider>
          </NimbleRouter>
        </Route>
      </Switch>
    </ErrorBoundary>
  </Router>
);

export default Main;
