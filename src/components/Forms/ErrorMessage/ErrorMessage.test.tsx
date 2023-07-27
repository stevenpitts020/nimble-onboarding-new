import React from "react";
import { render } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<ErrorMessage {...defaultProps} {...props} />);
};

describe("ErrorMessage", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test-error-message",
      errors: { message: "Test error message" },
    });
    const container = getByTestId("ErrorMessage");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test-error-message");
  });
});
