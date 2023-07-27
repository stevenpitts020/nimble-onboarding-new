/*
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import StepInvites from "./StepInvites";
import StepSuccess from "../StepSuccess/StepSuccess";
import {
  InstitutionContext,
  ProspectProvider,
  ConsentsProvider,
  BsaProvider,
} from "../../../store";
import { LoadingProvider } from "../../../store/LoadingContext";
import { validSigner } from "../../../services/__mocks__/Signer";
import { DocumentStateContext } from "../../../store/DocumentsContext";
import StepBSAQuestionnaire from "../StepBSAQuestionnaire/StepBSAQuestionnaire";

// reuse this in several tests
const renderWithProps = (props: any) => {
  const defaultProps = {};
  const documentProps = {
    status: "idle",
    documents: {
      selfie: { id: "somefrontid", file: "somefrontfile" },
      front: { id: "somefrontid", file: "somefrontfile" },
      back: { id: "somebackid", file: "somebackfile" },
    },
    ...props.documentProviderProps,
  };
  const {
    invitees = [],
    products = [{ productId: "some-platinum-checking" }],
    ...otherProps
  } = props;
  return render(
    <MemoryRouter
      initialEntries={[
        "/onboarding/bsa-questionnaire",
        "/onboarding/invite-signers",
      ]}
      initialIndex={1}
    >
      <LoadingProvider>
        <InstitutionContext.Provider
          value={{
            id: "centralbank",
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
              invitees,
              products,
              selectedProductName: props.selectedProductName,
            }}
          >
            <DocumentStateContext.Provider value={documentProps}>
              <ConsentsProvider>
                <BsaProvider>
                  <Route
                    path="/onboarding/bsa-questionnaire"
                    component={StepBSAQuestionnaire}
                  />
                  <StepInvites {...defaultProps} {...otherProps} />
                  <Route path="/onboarding/success" component={StepSuccess} />
                </BsaProvider>
              </ConsentsProvider>
            </DocumentStateContext.Provider>
          </ProspectProvider>
        </InstitutionContext.Provider>
      </LoadingProvider>
    </MemoryRouter>
  );
};

describe("StepInvites", () => {
  test("renders without error", async () => {
    renderWithProps({});

    await waitFor(() => {
      const container = screen.getByTestId("StepInvites");
      expect(container).toBeInTheDocument();
    });
  });

  test("Can skip step to success", async () => {
    renderWithProps({});
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("InvitesFormContinue"));
    });
    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(container).toBeInTheDocument();
    });
  });

  test("Can continue with valid emails", async () => {
    const invitees = [
      { email: "this.is.a.valid@email.com", role: "SECONDARY" },
    ];

    renderWithProps({ invitees });
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));

    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");
      expect(screen.queryByTestId("formErrorAlert")).toBeNull();
      expect(container).toBeInTheDocument();
    });
  });

  // These tests need JSDom to be upgraded in order to run
  test.skip("can continue with repeated emails", async () => {
    const invitees = [
      { email: "this.is.a.valid@email.com", role: "SECONDARY" },
      { email: "this.is.a.valid@email.com", role: "SECONDARY" },
    ];

    renderWithProps({ invitees });
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));

    await waitFor(() => {
      const container = screen.getByTestId("StepSuccess");

      expect(screen.queryByTestId("formErrorAlert")).toBeNull();
      expect(container).toBeInTheDocument();
    });
  });

  test.skip("can abort with repeated emails", async () => {
    const invitees = [
      { email: "this.is.a.valid@email.com", role: "SECONDARY" },
      { email: "this.is.a.valid@email.com", role: "SECONDARY" },
    ];

    renderWithProps({ invitees });
    fireEvent.click(screen.getByTestId("InvitesFormContinue"));

    expect(
      await screen.findByText(/inviting someone using the same email/)
    ).toBeInTheDocument();

    expect(screen.queryByTestId("StepSuccess")).not.toBeInTheDocument();
  });

  // Multiple Signers has been removed
  describe("With Multiple Signers", () => {
    test("Can add multiple signers, up to limit", async () => {
      const { queryByTestId, getByTestId, getAllByTestId } = renderWithProps({
        maxInvitees: 3,
      });

      fireEvent.click(getByTestId("addSigner"));
      await waitFor(() => {
        expect(getAllByTestId("RepeatableSigner")).toHaveLength(2);
      });

      fireEvent.click(getByTestId("addSigner"));
      await waitFor(() => {
        expect(getAllByTestId("RepeatableSigner")).toHaveLength(3);
      });

      expect(queryByTestId("addSigner")).toBe(null);
    });

    test("There can be only one Primary", async () => {
      const { getByTestId, queryByTestId } = renderWithProps({});
      expect(queryByTestId("AlertMessage")).not.toBeInTheDocument();

      fireEvent.click(getByTestId("Switch-signers[0].role-labelOn"));
      await waitFor(async () => {
        fireEvent.click(getByTestId("addSigner"));
        await waitFor(() => {
          expect(getByTestId("Switch-signers[1].role-labelOn")).toHaveClass(
            "disabled"
          );
        });
      });
    });
  });

  describe("With invalid errors", () => {
    test("Can not continue with invalid emails", async () => {
      const invitees = [{ email: "an invalid@email", role: "SECONDARY" }];
      const { getByTestId } = renderWithProps({ invitees });

      fireEvent.click(getByTestId("InvitesFormContinue"));
      await waitFor(() => {
        expect(getByTestId("InvitesFormContinue")).toHaveAttribute("disabled");
        expect(getByTestId("formErrorAlert")).toBeInTheDocument();
      });
    });

    test("Shows alert when Primary is selected", async () => {
      const { getByTestId, queryByTestId } = renderWithProps({});
      expect(queryByTestId("AlertMessage")).not.toBeInTheDocument();

      // Set role to PRIMARY > Shows Alert
      fireEvent.click(getByTestId("Switch-signers[0].role-labelOn"));
      await waitFor(async () => {
        expect(getByTestId("AlertMessage")).toBeInTheDocument();

        // Revert role to SECONDARY > Hides Alert
        fireEvent.click(getByTestId("Switch-signers[0].role-labelOn"));
        await waitFor(() => {
          expect(getByTestId("AlertMessage")).toBeInTheDocument();
        });
      });
    });
  });

  test("clicking back triggers history change back to StepBSAQUestionnaire", async () => {
    renderWithProps({});
    await waitFor(() => {
      fireEvent.click(screen.getByText("Back"));
    });
    await waitFor(() => {
      expect(screen.getByTestId("step-bsa-questionnaire")).toBeInTheDocument();
    });
  });

  test("show product name in title", async () => {
    const selectedProductName = "Platinum Checking";
    const { getByTestId } = renderWithProps({ selectedProductName });

    await waitFor(() => {
      expect(getByTestId("StepInvites")).toHaveTextContent(selectedProductName);
    });
  });
});
*/
