import React from "react";
import { render } from "@testing-library/react";
import { Layout } from "./Layout";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
    dataTestId: "Layout",
  };
  return render(
    <Layout {...defaultProps} {...props}>
      Test page
    </Layout>
  );
};

describe("Layout", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    const container = getByTestId("Layout");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");
  });
});
