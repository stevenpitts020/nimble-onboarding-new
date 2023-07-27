import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("<Loading>", () => {
  test("renders Loading component when prop active is set", () => {
    const { getByTestId } = render(<Loading active />);
    const loading = getByTestId("loading-test");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveClass("loading-square");
  });

  test("renders Loading covering full page", () => {
    const { getByTestId } = render(<Loading active fullPage />);
    const loading = getByTestId("loading-test");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveClass("loading-cover");
  });
});
