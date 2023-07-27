import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

test("renders Home title", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <Home />
    </Router>
  );

  const linkElement = getByText(/Welcome/i, { selector: "h2" });
  expect(linkElement).toBeInTheDocument();
});
