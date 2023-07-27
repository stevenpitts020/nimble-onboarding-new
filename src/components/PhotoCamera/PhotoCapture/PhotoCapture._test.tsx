/*
import React from "react";
import { render, waitFor } from "@testing-library/react";
import PhotoCapture from "./PhotoCapture";

// reuse this in several tests
const renderWithProps = (receivedProps: any) => {
  const defaultProps = {
    className: "ni-test",
    width: 100,
    height: 100,
  };
  return render(<PhotoCapture {...defaultProps} {...receivedProps} />);
};

const props = {
  allowFlip: true,
  onTakePhoto: jest.fn(),
  onFlipCamera: jest.fn(),
};
const onError = () => {};

describe("PhotoCapture", () => {
  test("renders warning on error", async () => {
    const { getByTestId } = renderWithProps({});
    const container = getByTestId("photoCapture");

    await waitFor(() => getByTestId("photoCapture")).catch((err: any) =>
      console.log(`Error you need to deal with: ${err}`)
    );

    expect(container).not.toBeInTheDocument();

    const messageContainer = getByTestId("NoCameraMessage");
    expect(messageContainer).toBeInTheDocument();
  });

  test("should handle click", () => {
    const { getByTestId } = render(
      <PhotoCapture onError={onError} onTakePhoto={props.onTakePhoto} />
    );

    const container = getByTestId("photoCapture");
    expect(container).toBeInTheDocument();

    getByTestId("CaptureButton").click();
    expect(props.onTakePhoto).toHaveBeenCalled();
  });

  test("should show flip button if allowFlip is true", () => {
    const { getByTestId } = render(
      <PhotoCapture
        onError={onError}
        allowFlip={props.allowFlip}
        onTakePhoto={props.onTakePhoto}
        onFlipCamera={props.onFlipCamera}
      />
    );
    const button = getByTestId("flipButton");
    expect(button).toBeInTheDocument();
  });
  test("handle flip button click", () => {
    const { getByTestId } = render(
      <PhotoCapture
        onError={onError}
        allowFlip={props.allowFlip}
        onTakePhoto={props.onTakePhoto}
        onFlipCamera={props.onFlipCamera}
      />
    );
    const button = getByTestId("flipButton");
    button.click();
    expect(props.onFlipCamera).toHaveBeenCalled();
  });
});
*/
