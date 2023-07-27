import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { validSigner, emptySigner } from "../../../services/__mocks__/Signer";
import AuthFormEmail from "./AuthFormEmail";
import { LayoutProvider } from "../../../store/LayoutContext";

const fillAuthForm = (getByName: any) => {
  const phoneNumber = getByName("input-auth-phoneNumber");

  fireEvent.click(phoneNumber, { target: validSigner.phoneNumber });
};
// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
    defaultValues: emptySigner,
    onValidate: jest.fn(),
  };
  return render(
    <LayoutProvider>
      <AuthFormEmail {...defaultProps} {...props} />
    </LayoutProvider>
  );
};

describe("AuthFormEmail", () => {
  test("renders without error", async () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    await waitFor(() => {
      const container = getByTestId("AuthFormEmail");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("ni-test");
    });
  });
});
export default fillAuthForm;
