import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { validSigner, emptySigner } from "../../../services/__mocks__/Signer";
import AuthFormPhone from "./AuthFormPhone";
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
      <AuthFormPhone {...defaultProps} {...props} />
    </LayoutProvider>
  );
};

describe("AuthFormPhone", () => {
  test("renders without error", async () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    await waitFor(() => {
      const container = getByTestId("AuthFormPhone");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("ni-test");
    });
  });

  test("after submitting it should not call if form not valid", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();
    const onValidate = jest.fn();

    const { getByTestId } = render(
      <LayoutProvider>
        <Router history={history}>
          <AuthFormPhone onSubmit={onSubmit} onValidate={onValidate} />
        </Router>
      </LayoutProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId("input-phone"), {
        target: { value: "(111) 111-1111" },
      });
      fireEvent.submit(getByTestId("step-auth-continue"));
    });
    expect(screen.getByText(/Please review the form /)).toBeTruthy();
  });
  test("should change phone number with mask", async () => {
    const mockOnClick = jest.fn();
    renderWithProps({
      onSubmit: mockOnClick,
      className: "ni-test",
      typeInput: "phoneNumber",
      defaultValues: validSigner,
    });

    const input = screen.getByTestId("input-phone");

    fireEvent.change(input, { target: { value: "(323) 456-7890" } });
    await waitFor(() => {
      expect(input).toHaveValue("(323) 456-7890");
    });
  });

  test("should render phone number with mask", async () => {
    renderWithProps({ defaultValues: validSigner, typeInput: "phoneNumber" });
    const phone = screen.getByTestId("input-phone");
    await waitFor(() => {
      expect(phone).toHaveValue("(323) 456-7890");
    });
  });
});
export default fillAuthForm;
