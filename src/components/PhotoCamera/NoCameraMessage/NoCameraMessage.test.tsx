import React from "react";
import { render } from "@testing-library/react";
import NoCameraMessage from "./NoCameraMessage";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<NoCameraMessage {...defaultProps} {...props} />);
};

describe("NoCameraMessage", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    const container = getByTestId("NoCameraMessage");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-no-camera-message");
  });

  test("renders learn react text inside Error Message", () => {
    const { getByText } = renderWithProps({
      children: "learn react",
    });
    const container = getByText(/learn react/i);

    expect(container).toBeInTheDocument();
  });
});
