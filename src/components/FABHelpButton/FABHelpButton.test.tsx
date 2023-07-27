import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FABHelpButton from "./FABHelpButton";

describe("FABHelpButton", () => {
  test("should render correctly", () => {
    const { getByTestId } = render(<FABHelpButton />);
    expect(getByTestId("fab-container")).toBeInTheDocument();
  });
  test("should handle click", () => {
    const { getByTestId } = render(<FABHelpButton />);
    const button = getByTestId("fab-help-button");
    const helpContent = getByTestId("fab-help-content");
    fireEvent.click(button);
    expect(helpContent.classList.contains("visible")).toBe(true);
  });
});
