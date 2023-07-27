import React from "react";
import { waitFor, screen } from "@testing-library/react";
import StepCaptureDocuments from "./StepCaptureDocuments";
import { DocumentsProvider } from "../../../store";
import renderWithRouter from "../../../support/router/renderWithRouter";
import { LayoutProvider } from "../../../store/LayoutContext";

const app = (props: any) => (
  <LayoutProvider>
    <DocumentsProvider>
      <StepCaptureDocuments {...props} />
    </DocumentsProvider>
  </LayoutProvider>
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
});
