import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import StepChooseProductOptions from "./StepChooseProductOptions";
import StepChooseAmount from "../StepChooseAmount/StepChooseAmount";
import { validSigner } from "../../../services/__mocks__/Signer";
import { ProspectProvider } from "../../../store";
import { LoadingProvider } from "../../../store/LoadingContext";
import {
  initialProductConfiguration,
  mockSelectedProductCD,
} from "../../../services/__mocks__/Products";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };

  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <LoadingProvider>
        <ProspectProvider
          initialProviderState={{
            error: undefined,
            status: "idle",
            signer: validSigner,
            invitees: [],
            products: [initialProductConfiguration],
            accountRequestId: props.accountRequestId,
            selectedProductName: mockSelectedProductCD.name,
            signerId: props.signerId,
            selectedProduct: mockSelectedProductCD,
          }}
        >
          <div>
            <StepChooseProductOptions {...defaultProps} {...props} />
            <Route
              path="/onboarding/choose-amount"
              component={StepChooseAmount}
            />
          </div>
        </ProspectProvider>
      </LoadingProvider>
    </Router>
  );
};

describe("StepChooseProductOptions", () => {
  test("renders without error", () => {
    const { getByTestId, getByText } = renderWithProps({});
    const container = getByTestId("StepChooseProductOptions");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");

    const element = getByText(/Make the most of your new account/i, {
      selector: "h1",
    });
    const title = getByTestId("SelectedProduct");
    expect(title).toBeInTheDocument();
    expect(element).toBeInTheDocument();
  });

  // ISSUE-33
  test.skip("after choosing a product option it should proceed Amount step", async () => {
    renderWithProps({});
    fireEvent.click(screen.getByTestId("ButtonSelectedOption-12m"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("step-info-continue"));
    });

    await waitFor(() => {
      const container = screen.getByTestId("StepChooseAmount");
      expect(container).toBeInTheDocument();
    });
  });
});
