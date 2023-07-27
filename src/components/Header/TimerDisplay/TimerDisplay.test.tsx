import React from "react";
import { render } from "@testing-library/react";
import TimerDisplay from "./TimerDisplay";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<TimerDisplay {...defaultProps} {...props} />);
};

describe("TimerDisplay", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    const container = getByTestId("timer");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");

    // we can add a snapshot if we wish
    // expect(container).toMatchSnapshot()
  });
});
