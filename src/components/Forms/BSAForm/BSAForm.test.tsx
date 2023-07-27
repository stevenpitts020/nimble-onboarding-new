import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, act, screen } from "@testing-library/react";
import BSAForm from "./BSAForm";
import { bsaQuestions } from "../../../services/__mocks__/AccountRequest";

const fillBSAForm = (getByTestId: any) => {
  const usCitizen = getByTestId("usCitizen-yes");
  const milesAway = getByTestId("milesAway-yes");
  const wireTransfersDomestic = getByTestId("wireTransfersDomestic-no");
  const wireTransfersInternational = getByTestId(
    "wireTransfersInternational-yes"
  );
  const cashTransactions = getByTestId("cashTransactions-yes");
  const anotherBank = getByTestId("anotherBank-no");
  const mobileDeposit = getByTestId("mobileOrATMDeposit-no");
  const individualIncome = getByTestId("individualIncome-no");
  const householdIncome = getByTestId("householdIncome-yes");

  fireEvent.click(usCitizen);
  fireEvent.click(milesAway);
  fireEvent.click(wireTransfersDomestic);
  fireEvent.click(wireTransfersInternational);
  fireEvent.click(cashTransactions);
  fireEvent.click(anotherBank);
  fireEvent.click(mobileDeposit);
  fireEvent.click(householdIncome);
  fireEvent.click(individualIncome);

  expect(usCitizen.value).toBe("yes");
  expect(milesAway.value).toBe("yes");
  expect(wireTransfersDomestic.value).toBe("no");
  expect(wireTransfersInternational.value).toBe("yes");
  expect(cashTransactions.value).toBe("yes");
  expect(anotherBank.value).toBe("no");
  expect(mobileDeposit.value).toBe("no");
  expect(householdIncome.value).toBe("yes");
  expect(individualIncome.value).toBe("no");

  // we are not setting html5 property checked so no point in verifying this
  // expect(usCitizen).toBeChecked()
  // expect(milesAway).toBeChecked()
  // expect(incomeIndividual).toBeChecked()
  // expect(incomeHousehold).toBeChecked()
  // expect(wireTransfersDomestic).not.toBeChecked()
};

describe("AmountForm", () => {
  const defaultBSA = {
    usCitizen: "no",
    milesAway: "yes",
    anotherBank: "yes",
    countryOfOrigin: "",
    hearAbout: "",
    wireTransfersDomestic: "",
    wireTransfersInternational: "",
    cashTransactions: "",
    otherBankName: "",
    mobileOrATMDeposit: "",
    individualIncome: "",
    householdIncome: "",
  };

  test("after submitting it should not call if form not filled", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <BSAForm
          defaultValues={defaultBSA}
          onSubmit={onSubmit}
          questions={bsaQuestions}
        />
      </Router>
    );

    await act(async () => {
      fireEvent.submit(getByTestId("submit-btn"));
    });
    expect(screen.getByText(/Please review the form /)).toBeTruthy();
  });

  test("after submitting it call onSubmit", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <BSAForm
          defaultValues={defaultBSA}
          onSubmit={onSubmit}
          questions={bsaQuestions}
        />
      </Router>
    );
    fillBSAForm(getByTestId);
    await act(async () => {
      fireEvent.submit(getByTestId("submit-btn"));
    });
    expect(onSubmit).toBeCalled();
  });
});
export default fillBSAForm;
