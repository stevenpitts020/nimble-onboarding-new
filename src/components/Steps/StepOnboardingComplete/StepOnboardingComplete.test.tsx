import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import StepOnboardingComplete from "./StepOnboardingComplete";
import { validSigner } from "../../../services/__mocks__/Signer";
import { ProspectProvider, BsaProvider } from "../../../store";
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
          <BsaProvider>
            <div>
              <StepOnboardingComplete {...defaultProps} {...props} />
            </div>
          </BsaProvider>
        </ProspectProvider>
      </LoadingProvider>
    </Router>
  );
};

describe("StepOnboardingComplete", () => {
  test("renders without error", () => {
    renderWithProps({});
    const container = screen.getByTestId("StepOnboardingComplete");
    const title = screen.getByTestId("StepOnboardingCompleteTitle");
    expect(container).toBeInTheDocument();
    expect(title).toContainHTML("Hello");
    expect(container).toHaveClass("ni-test");
  });
});
