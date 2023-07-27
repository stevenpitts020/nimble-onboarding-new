import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import StepTermsAndConditions from "./StepTermsAndConditions";

import { ConsentsProvider } from "../../../store";
// acceptable data

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <ConsentsProvider>
        <StepTermsAndConditions {...defaultProps} {...props} />
      </ConsentsProvider>
    </Router>
  );
};

describe("StepTermsAndConditions", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({});
    const container = getByTestId("StepTermsAndConditions");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");
  });

  test("Continue button should be disabled by default", async () => {
    const { getByTestId } = renderWithProps({});
    // click on link
    const continueButton = getByTestId("step-terms-and-conditions-continue");
    expect(continueButton).toHaveAttribute("disabled");
  });

  test("Continue button should be active after clicking on a checkbox", async () => {
    // const mockOnClick = jest.fn()
    const { getByTestId } = renderWithProps({});

    // first check the agreement box
    fireEvent.click(getByTestId("checkbox"));
    // click on link
    const continueButton = getByTestId("step-terms-and-conditions-continue");
    expect(continueButton).not.toHaveAttribute("disabled");
  });
});
