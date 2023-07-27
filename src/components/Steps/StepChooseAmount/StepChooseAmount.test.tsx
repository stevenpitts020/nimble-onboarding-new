import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import StepChooseAmount from "./StepChooseAmount";
import StepBSAQuestionnaire from "../StepBSAQuestionnaire/StepBSAQuestionnaire";
import StepInvites from "../StepInvites/StepInvites";
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
              <StepChooseAmount {...defaultProps} {...props} />
              <Route
                path="/onboarding/invite-signers"
                component={StepInvites}
              />
              <Route
                path="/onboarding/bsa-questionnaire"
                component={StepBSAQuestionnaire}
              />
            </div>
          </BsaProvider>
        </ProspectProvider>
      </LoadingProvider>
    </Router>
  );
};

const fillForm = (getByTestId: any, value: string) => {
  const input = getByTestId("input-initialDeposit");
  fireEvent.change(input, { target: { value } });
};

describe("StepChooseAmount", () => {
  test("renders without error", () => {
    renderWithProps({});
    const container = screen.getByTestId("StepChooseAmount");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("ni-test");

    const element = screen.getByText(/Enter your initial deposit amount/i, {
      selector: "label",
    });
    expect(element).toBeInTheDocument();
  });

  describe("Submitting amount", () => {
    test("after submitting it should go to BSA questionnaire step", async () => {
      renderWithProps({});

      await act(async () => {
        fillForm(screen.getByTestId, "$999");
      });

      fireEvent.submit(screen.getByTestId("step-info-continue"));

      await waitFor(() => {
        const container = screen.getByTestId("step-bsa-questionnaire");
        expect(container).toBeInTheDocument();
      });
    });

    test("should display validation message", async () => {
      renderWithProps({});

      await act(async () => {
        fillForm(screen.getByTestId, "$499");
      });

      fireEvent.submit(screen.getByTestId("step-info-continue"));

      await waitFor(() => {
        const container = screen.getByText(
          "The minimum initial deposit amount is $500"
        );
        expect(container).toBeInTheDocument();
      });
    });
  });
});
