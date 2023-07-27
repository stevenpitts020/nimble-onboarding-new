import React from "react";
import { render } from "@testing-library/react";
import CaptureButton from "./CaptureButton";

describe("CaptureButton", () => {
  test("should handle click", () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <CaptureButton onClick={mockOnClick}>Hello</CaptureButton>
    );
    getByTestId("CaptureButton").click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
