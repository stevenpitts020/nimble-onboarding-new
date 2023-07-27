import React from "react";
import { render } from "@testing-library/react";
import Logo from "./Logo";

const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "test-me",
  };
  return render(<Logo {...defaultProps} {...props} />);
};

describe("Logo", () => {
  test("renders image", () => {
    const { getByRole } = renderWithProps({
      children: "learn react",
    });
    const container = getByRole("img");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-logo-img");
  });
});
