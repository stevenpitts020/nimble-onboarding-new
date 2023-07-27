import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "@sentry/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorPage from "./components/Static/Error/Error";

beforeAll(() => {
  // tslint:disable-next-line: no-empty
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

interface BombInterface {
  shouldThrow?: boolean;
}

const Bomb = (shouldThrow?: BombInterface) => {
  if (shouldThrow) {
    throw new Error("");
  } else {
    return null;
  }
};

test("calls Sentry and renders that there was a problem", () => {
  const { rerender } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );
  const mockReportError = jest.fn();

  rerender(
    <Router>
      <Switch>
        <ErrorBoundary
          showDialog={false}
          onError={mockReportError}
          fallback={ErrorPage}
        >
          <Bomb shouldThrow />
          <Route exact path="/">
            <h1>Hello</h1>
          </Route>
        </ErrorBoundary>
      </Switch>
    </Router>
  );

  const error = expect.any(Error);
  const info = expect.stringContaining("Bomb");
  const id = expect.any(String);

  expect(mockReportError).toHaveBeenCalledWith(error, info, id);
  expect(mockReportError).toHaveBeenCalledTimes(1);

  const element = screen.getByText(/Something went wrong/i);
  expect(element).toBeInTheDocument();

  // expect(console.error).toHaveBeenCalledTimes(2);

  fireEvent.click(screen.getByText(/Back to Homepage/i));
});
