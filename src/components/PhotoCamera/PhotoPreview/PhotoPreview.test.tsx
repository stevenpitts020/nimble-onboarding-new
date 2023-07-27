import React from "react";
import { render } from "@testing-library/react";
import PhotoPreview from "./PhotoPreview";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(<PhotoPreview {...defaultProps} {...props} />);
};

describe("PhotoPreview", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    const container = getByTestId("PhotoPreview");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");
  });

  test("renders src", () => {
    const { getByAltText } = render(
      <PhotoPreview alt="123" imageData="coco" />
    );
    const elem = getByAltText("123");
    expect(elem).toHaveAttribute("src", "coco");
  });
});
