import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import StepChooseProducts from "./StepChooseProducts";
import {
  ProspectProvider,
  InstitutionContext,
  ConsentsProvider,
  BsaProvider,
  LoadingProvider,
} from "../../../store";
import { DocumentStateContext } from "../../../store/DocumentsContext";
import StepChooseAmount from "../StepChooseAmount/StepChooseAmount";
import { validSigner } from "../../../services/__mocks__/Signer";

import { listProducts } from "../../../services/__mocks__/Products";
import StepSuccess from "../StepSuccess/StepSuccess";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {
    className: "ni-test",
  };
  const route = "/onboarding/choose-products";
  const history = createMemoryHistory({ initialEntries: [route] });

  return render(
    <Router history={history}>
      <InstitutionContext.Provider
        value={{
          id: props.institution.id,
          name: "centralbank",
          domain: "centralbank.com",
          backgroundImageUri: {
            default: "http://wearesingular.com/img/intro-bg.jpg",
          },
          logoUri: {
            default: "https://wearesingular.com/img/apple-touch-icon.png",
          },
        }}
      >
        <ProspectProvider
          initialProviderState={{
            error: undefined,
            status: "idle",
            signer: validSigner,
            invitees: [],
            products: [],
            accountRequestId: props.accountRequestId,
            signerId: props.signerId,
          }}
        >
          <LoadingProvider>
            <DocumentStateContext.Provider
              value={{
                status: "idle",
                documents: {
                  selfie: { id: "somefrontid" },
                  front: { id: "somefrontid" },
                  back: { id: "somebackid" },
                },
              }}
            >
              <ConsentsProvider>
                <BsaProvider>
                  <StepChooseProducts {...defaultProps} {...props} />
                  <Route path="/onboarding/success" component={StepSuccess} />
                  <Route
                    path="/onboarding/choose-amount"
                    component={StepChooseAmount}
                  />
                </BsaProvider>
              </ConsentsProvider>
            </DocumentStateContext.Provider>
          </LoadingProvider>
        </ProspectProvider>
      </InstitutionContext.Provider>
    </Router>
  );
};

describe("StepChooseProducts", () => {
  const institution = {
    id: "centralbank",
  };

  test("renders without error", async () => {
    await waitFor(() => renderWithProps({ institution }));

    await waitFor(() => {
      const container = screen.getByTestId("StepChooseProducts");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("ni-test");
    });
  });

  test("Should skip product step for invitees onboarding process", async () => {
    await waitFor(() =>
      renderWithProps({
        accountRequestId: "some-account-request-id",
        signerId: "some-signer-id",
        institution,
      })
    );

    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();
    });
  });

  // ISSUE-33
  test.skip("after submitting a product it should go to Choose Amount step", async () => {
    await waitFor(() => renderWithProps({ institution }));

    await waitFor(() => fireEvent.click(screen.getAllByText("Enroll")[0]));

    await waitFor(() => {
      const container = screen.getByTestId("StepChooseAmount");
      expect(container).toBeInTheDocument();
    });
  });

  test("renders list of products", async () => {
    await waitFor(() => renderWithProps({ institution }));

    await waitFor(() => {
      const productContainer = screen.getAllByTestId("product");
      const filteredProducts = listProducts.filter(
        (product) => product.category === "CHECKING"
      );
      expect(productContainer).toHaveLength(filteredProducts.length);
    });
  });

  test("change tab", async () => {
    await waitFor(() => renderWithProps({ institution }));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("StepTabSavingsAccount"));
      expect(screen.getByTestId("StepTabSavingsAccount")).toHaveClass("active");
      expect(screen.getByTestId("StepTabSavingsAccountImage")).toHaveAttribute(
        "src",
        "savingsIconActive.svg"
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("StepTabCheckingsAccount"));
      expect(screen.getByTestId("StepTabCheckingsAccount")).toHaveClass(
        "active"
      );
      expect(
        screen.getByTestId("StepTabCheckingsAccountImage")
      ).toHaveAttribute("src", "checkingIconActive.svg");
    });
  });
});
