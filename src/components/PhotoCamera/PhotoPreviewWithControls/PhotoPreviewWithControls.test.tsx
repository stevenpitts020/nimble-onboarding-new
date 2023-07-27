import React from "react";
import { render } from "@testing-library/react";
import PhotoPreviewWithControls from "./PhotoPreviewWithControls";

describe("PhotoPreview With Button", () => {
  test("Button handles click", () => {
    const mockOnClick = jest.fn();
    const mockOnClick2 = jest.fn();

    const { getByText } = render(
      <PhotoPreviewWithControls
        alt="ButtonText"
        onRepeat={mockOnClick}
        onContinue={mockOnClick2}
        imageData="coco"
      />
    );
    getByText("Repeat Photo").click();
    expect(mockOnClick).toHaveBeenCalled();

    getByText("Continue").click();
    expect(mockOnClick2).toHaveBeenCalled();
  });
});
