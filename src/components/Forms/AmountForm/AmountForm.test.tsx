import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, act } from "@testing-library/react";
import AmountForm from "./AmountForm";

const fillForm = (getByTestId: any) => {
  const input = getByTestId("input-initialDeposit");
  fireEvent.change(input, { target: { value: "$999" } });
};

describe("AmountForm", () => {
  test("after submitting it call onSubmit", async () => {
    const history = createMemoryHistory();
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <AmountForm min={100} onSubmit={onSubmit} />
      </Router>
    );

    await act(async () => {
      fillForm(getByTestId);
    });

    await act(async () => {
      fireEvent.submit(getByTestId("step-info-continue"));
    });

    expect(onSubmit).toBeCalled();
  });
});
