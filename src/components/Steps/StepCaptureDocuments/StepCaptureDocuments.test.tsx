import React from "react";
import { waitFor, screen } from "@testing-library/react";
import StepCaptureDocuments from "./StepCaptureDocuments";
import { DocumentsProvider } from "../../../store";
import renderWithRouter from "../../../support/router/renderWithRouter";

const app = (props: any) => (
  <DocumentsProvider>
    <StepCaptureDocuments {...props} />
  </DocumentsProvider>
);

describe("<StepFrontDocument />", () => {
  test("renders step title", async () => {
    const props = {};
    renderWithRouter(app(props), { route: "/onboarding/capture-documents" });

    await waitFor(() => {
      const container = screen.getByTestId("StepCaptureDocuments");
      expect(container).toBeInTheDocument();
    });
  });
  test("button should be disabled", () => {
    const props = {};
    renderWithRouter(app(props), { route: "/onboarding/capture-documents" });
    const button = screen.getByText(/Scan Document/);
    expect(button).toBeDisabled();
  });
});
