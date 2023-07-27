import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AlertDialogModal from "./AlertDialogModal";
import AlertDialogButtons from "./components/AlertDialogButtons";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<AlertDialogModal {...defaultProps} {...props} />);
};
const renderWithPropsButtons = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<AlertDialogButtons {...defaultProps} {...props} />);
};
describe("AlertDialogModal", () => {
  test("should render correctly", () => {
    renderWithProps({ className: "ni-test" });
    expect(screen.getByTestId("alert-dialog-modal")).toBeInTheDocument();
    expect(screen.getByTestId("alert-dialog-modal")).toHaveClass("ni-test");
  });
});
describe("AlertDialogButtons", () => {
  test("should render a button", () => {
    renderWithPropsButtons({ className: "ni-test" });
    expect(screen.getByTestId("alert-dialog-buttons")).toBeInTheDocument();
    expect(screen.getByTestId("alert-dialog-buttons")).toHaveClass("ni-test");
  });
  test("should render action button", () => {
    renderWithPropsButtons({ className: "ni-test" });
    expect(screen.getByTestId("action-button")).toBeInTheDocument();
  });
  test("should click on action button", () => {
    renderWithPropsButtons({ className: "ni-test" });
    fireEvent.click(screen.getByTestId("action-button"));
  });
  test("should render action button title", () => {
    renderWithPropsButtons({ className: "ni-test" });
    expect(screen.getByTestId("action-button").textContent).toBe("Yes");
  });
  test("should render cancel button title", () => {
    renderWithPropsButtons({
      className: "ni-test",
      onCancel: () => {},
    });
    expect(screen.getByTestId("cancel-button").textContent).toBe("No");
  });
});
