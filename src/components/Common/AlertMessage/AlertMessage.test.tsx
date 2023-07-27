import React from "react";
import { render } from "@testing-library/react";
import AlertMessage from "./AlertMessage";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<AlertMessage {...defaultProps} {...props} />);
};

describe("AlertMessage", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    const container = getByTestId("AlertMessage");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");

    // we can add a snapshot if we wish
    // expect(container).toMatchSnapshot()
  });
});
