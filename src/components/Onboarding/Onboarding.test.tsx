import React from "react";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Onboarding from "./Onboarding";
import renderWithRouter from "../../support/router/renderWithRouter";

const app = () => {
  return <Onboarding />;
};
describe("Onboarding", () => {
  test.skip("renders onboarding title", async () => {
    const { getByText } = renderWithRouter(app(), {
      route: "/onboarding",
    });

    await waitFor(() => {
      const linkElement = getByText(/Leading Onboarding/);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
