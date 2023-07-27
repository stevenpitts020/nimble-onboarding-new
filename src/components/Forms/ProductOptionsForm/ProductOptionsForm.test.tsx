import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, act, screen } from "@testing-library/react";
import ProductOptionsForm from "./ProductOptionsForm";

describe("ProductOptionsForm", () => {
  const options = [
    {
      id: "99416984-51dd-47e2-8dca-470872a6ba96",
      key: "atm_only_card",
      category: "product_features",
      title: "ATM Only Card",
      value: "false",
      annotation: "Free",
    },
    {
      id: "b428e1c8-cbcd-4e8a-b164-975ca7b9b4a4",
      key: "bill_pay",
      category: "product_features",
      title: "Bill Pay",
      value: "false",
      annotation: "Free",
      parentId: "e8823979-9550-416c-a5fb-f9d6aad3fcde",
    },
    {
      id: "75b0c309-1412-4786-ae42-8fbbfa5dc34c",
      key: "checks",
      category: "product_features",
      title: "Checks",
      value: "false",
      annotation: "Can be ordered thru online banking",
    },
    {
      id: "c510879c-da2d-4f25-96cf-028f6ada669b",
      key: "debit_card",
      category: "product_features",
      title: "Debit Card",
      value: "false",
      lead: "Shazam®Chek Card",
      annotation: "Free",
    },
    {
      id: "ddc32aab-4d05-4c20-a1d6-6d5034433c2a",
      key: "e_statements",
      category: "product_features",
      title: "E-Statements",
      value: "false",
      lead: "Get your bank statements directly on your email",
    },
    {
      id: "e8823979-9550-416c-a5fb-f9d6aad3fcde",
      key: "mobile_and_online_banking",
      category: "product_features",
      title: "Mobile & Online Banking",
      value: "false",
      annotation: "Free",
    },
    {
      id: "5ac2e4d0-a0a2-43d6-bcc8-00b7e57a3b13",
      key: "mobile_deposits",
      category: "product_features",
      title: "Mobile Deposits",
      value: "false",
      annotation: "Free",
      parentId: "e8823979-9550-416c-a5fb-f9d6aad3fcde",
    },
  ];
  const history = createMemoryHistory();
  const onSubmit = jest.fn();
  const onBack = jest.fn();

  test("should show all the product options", () => {
    render(
      <Router history={history}>
        <ProductOptionsForm
          onSubmit={onSubmit}
          options={options}
          onBack={onBack}
        />
      </Router>
    );
    expect(screen.getAllByRole("checkbox")).toMatchSnapshot();
  });
  test("clicking Back Button should call onBack", async () => {
    const { getByTestId } = render(
      <Router history={history}>
        <ProductOptionsForm
          onSubmit={onSubmit}
          options={options}
          onBack={onBack}
        />
      </Router>
    );
    await act(async () => {
      fireEvent.click(getByTestId("back-btn"));
    });
    expect(onBack).toBeCalled();
  });
  test("after submitting it call onSubmit", async () => {
    const { getByTestId } = render(
      <Router history={history}>
        <ProductOptionsForm
          onSubmit={onSubmit}
          options={options}
          onBack={onBack}
        />
      </Router>
    );
    await act(async () => {
      fireEvent.click(getByTestId("submit-btn"));
    });
    expect(onSubmit).toHaveBeenCalled();
  });
});
