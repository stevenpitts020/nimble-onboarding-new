// tslint:disable: max-line-length
// tslint:disable: quotemark
/*
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ProspectForm from "./ProspectForm";
import { validSigner, emptySigner } from "../../../services/__mocks__/Signer";

const fillProspecForm = (getByName: any) => {
  const firstName = getByName("input-firstName");
  const lastName = getByName("input-lastName");
  const dateOfBirth = getByName("input-dateOfBirth");
  const email = getByName("input-email");
  const phoneNumber = getByName("input-phoneNumber");
  const address = getByName("input-address");
  const city = getByName("input-city");
  const state = getByName("select-state");
  const zipCode = getByName("input-zipCode");
  const documentNumber = getByName("input-documentNumber");
  const documentIssuer = getByName("select-documentIssuer");
  const documentIssuedDate = getByName("input-documentIssuedDate");
  const documentExpirationDate = getByName("input-documentExpirationDate");
  const ssn = getByName("input-ssn");
  const employer = getByName("input-employer");

  fireEvent.click(firstName, { target: validSigner.firstName });
  fireEvent.click(lastName, { target: validSigner.lastName });
  fireEvent.click(dateOfBirth, { target: validSigner.dateOfBirth });
  fireEvent.click(email, { target: validSigner.email });
  fireEvent.click(phoneNumber, { target: validSigner.phoneNumber });
  fireEvent.click(address, { target: validSigner.address });
  fireEvent.click(city, { target: validSigner.city });
  fireEvent.change(state, { target: { value: validSigner.state } });
  fireEvent.click(zipCode, { target: validSigner.zipCode });
  fireEvent.click(documentNumber, { target: validSigner.documentNumber });
  fireEvent.change(documentIssuer, {
    target: { value: validSigner.documentIssuer },
  });
  fireEvent.click(documentIssuedDate, {
    target: validSigner.documentIssuedDate,
  });
  fireEvent.click(documentExpirationDate, {
    target: validSigner.documentExpirationDate,
  });
  fireEvent.click(ssn, { target: validSigner.ssn });
  fireEvent.click(employer, { target: validSigner.employer });
};
// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
    defaultValues: emptySigner,
    onValidate: jest.fn(),
  };
  return render(<ProspectForm {...defaultProps} {...props} />);
};

describe("ProspectForm", () => {
  test("renders without error", async () => {
    const { getByTestId } = renderWithProps({
      className: "ni-test",
    });
    await waitFor(() => {
      const container = getByTestId("ProspectForm");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("ni-test");
    });
  });
  test("after submitting it should not call if form not filled", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();
    const onValidate = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <ProspectForm onSubmit={onSubmit} onValidate={onValidate} />
      </Router>
    );

    await act(async () => {
      fireEvent.submit(getByTestId("step-info-continue"));
    });
    expect(screen.getByText(/Please review the form /)).toBeTruthy();
  });

  test("should change SSN with mask", async () => {
    const mockOnClick = jest.fn();
    renderWithProps({ onSubmit: mockOnClick });

    const input = screen.getByLabelText("Social Security Number");

    fireEvent.change(input, { target: { value: "222-22-2123" } });
    await waitFor(() => {
      expect(input).toHaveValue("222-22-2123");
    });
  });

  test("should render SSN number correctly", async () => {
    const { getByTestId } = renderWithProps({ defaultValues: validSigner });
    const ssnInput = getByTestId("input-ssn");
    await waitFor(() => {
      expect(ssnInput).toHaveValue("222-22-2123");
    });
  });

  test("should change phone number with mask", async () => {
    const mockOnClick = jest.fn();
    renderWithProps({ onSubmit: mockOnClick });

    const input = screen.getByLabelText("Phone Number");

    fireEvent.change(input, { target: { value: "(323) 456-7890" } });
    await waitFor(() => {
      expect(input).toHaveValue("(323) 456-7890");
    });
  });

  test("should render phone number with mask", async () => {
    const { getByLabelText } = renderWithProps({ defaultValues: validSigner });
    const phone = getByLabelText("Phone Number");
    await waitFor(() => {
      expect(phone).toHaveValue("(323) 456-7890");
    });
  });

  test("Continue button should display 'sign and finish' by default", async () => {
    const mockOnClick = jest.fn();
    const { getByTestId, getByText } = renderWithProps({
      onSubmit: mockOnClick,
    });

    await waitFor(() => {
      expect(getByText(/Sign and Finish/)).toEqual(
        getByTestId("step-info-continue")
      );
    });
  });

  test("should call onSubmit if form is valid", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();
    const onValidate = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <ProspectForm onSubmit={onSubmit} onValidate={onValidate} />
      </Router>
    );
    fillProspecForm(getByTestId);
    await act(async () => {
      fireEvent.submit(getByTestId("step-info-continue"));
    });
  });

  test("should warn about invalid ssn", async () => {
    const mockOnClick = jest.fn();

    renderWithProps({
      onSubmit: mockOnClick,
      defaultValues: {
        ...validSigner,
        ssn: "982-34-234523452345234523450823",
      },
    });

    expect(
      await screen.findByText(/9 characters/, { selector: "span" })
    ).toBeInTheDocument();
  });

  test("should warn about invalid phoneNumber", async () => {
    const mockOnClick = jest.fn();

    renderWithProps({
      onSubmit: mockOnClick,
      defaultValues: {
        ...validSigner,
        phoneNumber: "982-34-234523452345234523450823",
      },
    });
    expect(
      await screen.findByText(/20 characters/, { selector: "span" })
    ).toBeInTheDocument();
  });

  test("should warn about invalid zip code", async () => {
    const mockOnClick = jest.fn();

    renderWithProps({
      onSubmit: mockOnClick,
      defaultValues: {},
    });

    const zipCode = screen.getByTestId("input-zipCode");
    userEvent.type(zipCode, "z2fNWWd75FfpSJNDUXrcdL3V1z6l1tNllIaQhyz61");
    expect(
      await screen.findByText(/have more than 40 characters/, {
        selector: "span",
      })
    ).toBeInTheDocument();
  });

  test("should warn about invalid email", async () => {
    const mockOnClick = jest.fn();

    renderWithProps({
      onSubmit: mockOnClick,
      defaultValues: {},
    });

    const email = screen.getByTestId("input-email");
    userEvent.type(
      email,
      "Clk64d22WWhDOyRT3dMXxIlYWjCw7pFD1ZSHdCqlK8KYmiJSy9BADSc3faddEc0oPUBqgt6y5Tvx8bopGVc4Ur430" +
        "KXlQpqatlK7DVcQAvAgrVhUUPRtfMIwIfYsKU3xwjSqE2Tlxg2rjnfwCtQGngAmy1KtR3X12kzRZXSDaabPYX79edqwFZq" +
        "fzUeXHtmPS@wearesingular.com"
    );
    userEvent.click(screen.getByTestId("step-info-continue"));
    expect(
      await screen.findByText(/Email can’t have more than 90 characters/, {
        selector: "span",
      })
    ).toBeInTheDocument();
  });

  test("should warn about invalid inputs", async () => {
    const mockOnClick = jest.fn();

    renderWithProps({
      onSubmit: mockOnClick,
      defaultValues: {},
    });

    const invalidText =
      "sdDQni0TytmnxITwMgJv3uhvDxFoOAIFeVewVmgjtY5MMo0dc2xRt7fv2s5goEvcuBPXPxXZ26Qx" +
      "1XlqJNz9tCYkm91uyxAZlHjU5nhmk90oo2TskpoJv265JJ7DBAOk98YfeFmxYELiMq07OqofPc1";

    const address = screen.getByTestId("input-address");
    const city = screen.getByTestId("input-city");
    const employer = screen.getByTestId("input-employer");

    userEvent.type(address, invalidText);
    userEvent.type(city, invalidText);
    userEvent.type(employer, invalidText);

    userEvent.click(screen.getByTestId("step-info-continue"));
    const results = await screen.findAllByText(
      /have more than 100 characters/,
      { selector: "span" }
    );

    expect(results).toHaveLength(3);
  });

  test("should warn about invalid first name and last name text", async () => {
    const mockOnClick = jest.fn();

    renderWithProps({
      onSubmit: mockOnClick,
      defaultValues: {},
    });

    const invalidText =
      "sdDQni0TytmnxITwMgJv3uhvDxFoOAIFeVewVmgjtY5MMo0dc2xRt7fv2s5goEv" +
      "cuBPXPxXZ26Qx1XlqJNz9tCYkm91uyxAZlHjU5nhmk90oo2TskpoJv265JJ7DBAOk98YfeFmxYELiMq07OqofPc1";

    const firstName = screen.getByTestId("input-firstName");
    const lastName = screen.getByTestId("input-lastName");

    userEvent.type(firstName, invalidText);
    userEvent.type(lastName, invalidText);

    const results = await screen.findAllByText(
      /have more than 100 characters/,
      { selector: "span" }
    );
    expect(results).toHaveLength(2);
  });
});
export default fillProspecForm;
*/
