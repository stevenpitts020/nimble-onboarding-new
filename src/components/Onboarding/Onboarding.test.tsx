import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Onboarding from "./Onboarding";

describe("Onboarding", () => {
  test("renders onboarding title", async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Onboarding />
      </Router>
    );

    await waitFor(() => {
      const linkElement = getByText(/Welcome/);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
