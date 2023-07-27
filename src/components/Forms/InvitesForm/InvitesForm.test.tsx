import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InvitesForm from "./InvitesForm";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  return render(
    <MemoryRouter
      initialEntries={[
        "/onboarding/choose-products",
        "/onboarding/invite-signers",
      ]}
      initialIndex={1}
    >
      <InvitesForm {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("InvitesForm", () => {
  it("renders without error", () => {
    renderWithProps({ className: "ni-test" });

    const container = screen.getByTestId("InvitesForm");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");
  });

  it("should submit when data filled", async () => {
    const onSubmit = jest.fn();
    renderWithProps({ onSubmit });

    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@wearesingular.com" } });
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should add another signer with Add Button", async () => {
    renderWithProps({});

    expect(screen.getAllByTestId("RepeatableSigner")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("addSigner"));

    expect(screen.getAllByTestId("RepeatableSigner")).toHaveLength(2);
  });

  it("should remove a signer", async () => {
    renderWithProps({});

    fireEvent.click(screen.getByTestId("addSigner"));

    expect(screen.getAllByTestId("RepeatableSigner")).toHaveLength(2);

    const [last] = screen.getAllByTestId("removeButton").slice(-1);
    fireEvent.click(last);
    expect(screen.getAllByTestId("RepeatableSigner")).toHaveLength(1);
  });

  it("should show validation if email not valid", async () => {
    const onSubmit = jest.fn();

    renderWithProps({ onSubmit });
    const input = screen.getByLabelText("Email");

    fireEvent.change(input, { target: { value: "test.com" } });
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
      const elementAlert = screen.getByText(/Please review the form before/);
      expect(elementAlert).toBeInTheDocument();
    });
  });

  it("should exclude empty signers", async () => {
    const onSubmit = jest.fn();
    renderWithProps({ onSubmit });

    // type first input
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@wearesingular.com" } });
    // add signer
    fireEvent.click(screen.getByTestId("addSigner"));
    // click continue
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      signers: [{ email: "test@wearesingular.com", role: "SECONDARY" }],
    });
  });

  it("should skip with no signers", async () => {
    const onSubmit = jest.fn();
    renderWithProps({ onSubmit });

    // click continue
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      signers: [],
    });
  });
});
