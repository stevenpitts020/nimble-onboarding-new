import React from "react";
import { render, screen } from "@testing-library/react";
import DocumentCapture from "./DocumentCapture";

const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
    onLoadFail: (error: string) => error,
    documentType: "PASSPORT",
  };
  return render(<DocumentCapture {...defaultProps} {...props} />);
};
describe("DocumentCapture", () => {
  test("should render correctly", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("document-capture")).toBeInTheDocument();
  });
  test("should have video element", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("camera-feed")).toBeInTheDocument();
  });
  test("should have canvas element", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("camera-feedback")).toBeInTheDocument();
  });
});
