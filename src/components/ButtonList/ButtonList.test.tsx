import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonList from "./ButtonList";

const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<ButtonList {...defaultProps} {...props} />);
};
describe("ButtonList", () => {
  test("should render correctly", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("button-list")).toBeInTheDocument();
  });
  test("should render a request new account button", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("requestButton")).toBeInTheDocument();
  });
  test("should render institution button", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("institutionButton")).toBeInTheDocument();
  });
  test("should render support button", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("supportButton")).toBeInTheDocument();
  });
});
