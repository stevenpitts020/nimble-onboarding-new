import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ProspectContext, ProspectProvider } from "./ProspectContext";
import { validSigner } from "../services/__mocks__/Signer";
import { IProps } from "./ProspectContextType";
import { IInvitedSigner, IProductConfiguration } from "./reducers/type";

const renderApp = (props: IProps) =>
  render(
    <ProspectProvider>
      <ProspectContext.Consumer>
        {(context) => {
          const {
            prospect,
            updateSigner,
            populateProspectWithFields,
            sendDataToServer,
            addInvitee,
            setInvitees,
            addProduct,
            updateInitialDeposit,
          } = context;

          const handleUpdate = () => {
            updateSigner(props.signer);
          };

          const handlePopulate = () => {
            populateProspectWithFields(
              props.documents.front!.id,
              props.documents.back!.id
            );
          };

          const handleSend = () => {
            sendDataToServer(
              props.institutionId,
              props.documents,
              props.consents,
              props.bsa
            );
          };

          const updateIds = () => {
            const { accountRequestId, signerId } = props;
            if (accountRequestId && signerId) {
              addInvitee({ accountRequestId, signerId, inviteeToken: "123" });
            }
          };

          const addInviteToState = () => {
            if (props.invitees) {
              setInvitees(props.invitees);
            }
          };

          const addProductsToState = () => {
            if (props.selectedProduct) {
              addProduct(props.selectedProduct);
            }
          };

          const addInitialDepositToState = () => {
            if (props.product?.initialDeposit) {
              updateInitialDeposit(props.product.initialDeposit);
            }
          };

          return (
            <div>
              <button
                onClick={handleUpdate}
                data-testid="update"
                aria-label="update"
              />
              <button
                onClick={handlePopulate}
                data-testid="populate"
                aria-label="populate"
              />
              <button
                onClick={handleSend}
                data-testid="sendData"
                aria-label="sendData"
              />
              <button
                onClick={updateIds}
                data-testid="updateIds"
                aria-label="updateIds"
              />
              <button
                onClick={addInviteToState}
                data-testid="setInvitees"
                aria-label="setInvitees"
              />
              <button
                onClick={addProductsToState}
                data-testid="addProduct"
                aria-label="addProduct"
              />
              <button
                onClick={addInitialDepositToState}
                data-testid="changeInitialDeposit"
                aria-label="changeInitialDeposit"
              />

              <div data-testid="account-request-id">
                {prospect.accountRequestId}
              </div>
              <div data-testid="signer-id">{prospect.signerId}</div>
              <div data-testid="signer-name">{prospect.signer.firstName}</div>
              <div data-testid="signer-state">{prospect.signer.state}</div>
              <div data-testid="signer-documentIssuer">
                {prospect.signer.documentIssuer}
              </div>
              <div data-testid="signer-selfie-id">
                {prospect.signer.selfieDocumentId}
              </div>
              <div data-testid="status">{prospect.status}</div>
              {prospect.tokens &&
                prospect.tokens.map((token) => (
                  <div data-testid="tokens" key={token.id}>
                    <span data-testid="token-id">{token.id}</span>
                  </div>
                ))}
              <div data-testid="error">{prospect.error}</div>
              {prospect.invitees.map((item) => (
                <div data-testid="invitee-item" key={item.id}>
                  <span data-testid="invitee-id">{item.id}</span>
                  <span data-testid="invitee-email">{item.email}</span>
                  <span data-testid="invitee-role">{item.role}</span>
                </div>
              ))}
              <h5>Products</h5>
              {prospect.products.map((product: IProductConfiguration) => (
                <div data-testid="product" key={product.productId}>
                  <span data-testid="product-id">{product.productId}</span>
                  <span data-testid="initial-deposit">
                    {product.initialDeposit}
                  </span>
                  <span data-testid="selected-product">
                    {prospect.selectedProductName}
                  </span>
                </div>
              ))}
            </div>
          );
        }}
      </ProspectContext.Consumer>
    </ProspectProvider>
  );

describe("Prospect Context/Provider", () => {
  // default props for the test
  const props = {
    signer: validSigner,
    institutionId: "centralbank",
    documents: {
      front: { id: "frontid", file: "filefront" },
      back: { id: "backid", file: "fileback" },
      selfie: { id: "selfieid", file: "fileselfie" },
    },
    product: { initialDeposit: 100 },
    selectedProduct: {
      id: "product-with-dirty-html",
      name: "Shamrock Savings",
      category: "SAVINGS",
      summary:
        "Shamrock Savings gives you rewards for maintaining a higher balance.",
      content: "<img src=x onerror=alert(1)//>",
      options: [
        {
          key: "value_min",
          title: "minimum Deposit",
          value: "500",
          category: "initial_deposit",
        },
      ],
    },
    consents: {
      initial: true,
      terms: true,
      treatmentPhotos: true,
      privacyPolicy: true,
      communication: true,
    },
    bsa: {
      usCitizen: "no",
      milesAway: "yes",
      wireTransfersDomestic: "yes",
      wireTransfersInternational: "yes",
      cashTransactions: "no",
      anotherBank: "yes",
      mobileOrATMDeposit: "yes",
      otherBankName: "2323",
      countryOfOrigin: "AF",
      individualIncome: "yes",
      householdIncome: "yes",
    },
    tokens: [{ id: "", token: "" }],
  };

  describe("Updating a Prospect Signer Personal Information", () => {
    test("should update state with new info", async () => {
      // arrange
      const { getByTestId } = renderApp(props);
      // act
      fireEvent.click(getByTestId("update"));
      // assert
      await waitFor(() => {
        const firstName = getByTestId("signer-name");
        const selfieId = getByTestId("signer-selfie-id");
        expect(firstName).toHaveTextContent("John");
        expect(selfieId).toHaveTextContent("someselfieID");

        const status = getByTestId("status");
        expect(status).toHaveTextContent("signerReady");
      });
    });

    test("should populate state from identity check API call", async () => {
      // arrange
      const { getByTestId } = renderApp(props);
      const isEmptyName = getByTestId("signer-name");
      expect(isEmptyName).toHaveTextContent("");

      // act
      fireEvent.click(getByTestId("populate"));

      // assert
      await waitFor(() => {
        const firstName = getByTestId("signer-name");
        expect(firstName).toHaveTextContent("John");

        const state = getByTestId("signer-state");
        expect(state).toHaveTextContent("CA");

        const stateDrivers = getByTestId("signer-documentIssuer");
        expect(stateDrivers).toHaveTextContent("FL");

        const status = getByTestId("status");
        expect(status).toHaveTextContent("signerReady");
      });
    });
  });
  describe("Creating an Account Request", () => {
    test("Should create an Account Request", async () => {
      const testProps = {
        ...props,
        signerId: "some-signer-id",
        accountRequestId: "someId",
        tokens: [{ id: "accountRequestToken", token: "this is a token" }],
      };
      const { getByTestId } = renderApp(testProps);
      fireEvent.click(getByTestId("updateIds"));
      // assert
      await waitFor(async () => {
        const accountRequestIdElement = screen.getByText(
          testProps.accountRequestId
        );
        expect(accountRequestIdElement).toBeInTheDocument();
      });
    });
    test("should send data to server successfully", async () => {
      // arrange
      const testProps = {
        ...props,
        product: {
          initialDeposit: 500099,
        },
        invitees: [],
      };

      const { getByTestId } = renderApp(testProps);

      // act
      fireEvent.click(getByTestId("update"));

      fireEvent.click(getByTestId("addProduct"));
      fireEvent.click(screen.getByTestId("changeInitialDeposit"));
      fireEvent.click(getByTestId("sendData"));

      // assert
      await waitFor(() => {
        const status = getByTestId("status");
        expect(status).toHaveTextContent("embedReady");
      });
    });
    test("should send data to server successfully with invitees", async () => {
      // arrange
      const testProps = {
        ...props,
        product: {
          initialDeposit: 500099,
        },
        invitees: [
          {
            id: "id1",
            role: "SECONDARY",
            email: "john@hotmail.com",
          } as IInvitedSigner,
          {
            id: "id2",
            role: "SECONDARY",
            email: "johnParson@hotmail.com",
          } as IInvitedSigner,
        ],
        tokens: [{ id: "accountRequestToken", token: "this is a token" }],
      };

      const { getByTestId } = renderApp(testProps);

      fireEvent.click(screen.getByTestId("setInvitees"));
      fireEvent.click(getByTestId("update"));
      fireEvent.click(getByTestId("addProduct"));
      fireEvent.click(screen.getByTestId("changeInitialDeposit"));
      fireEvent.click(getByTestId("sendData"));

      // assert
      await waitFor(() => {
        const status = getByTestId("status");
        const tokens = getByTestId("tokens");
        expect(tokens).toHaveTextContent("accountRequestToken");
        expect(status).toHaveTextContent("embedReady");
      });
    });

    test("should render error when sending data to server", async () => {
      props.institutionId = "";
      const { getByTestId } = renderApp(props);

      // act
      fireEvent.click(getByTestId("update"));

      await waitFor(async () => {
        fireEvent.click(getByTestId("addProduct"));
      });
      await waitFor(async () => {
        fireEvent.click(getByTestId("sendData"));
      });
      // assert
      await waitFor(() => {
        const error = getByTestId("error");
        expect(error).toHaveTextContent("no institution ID");

        const status = getByTestId("status");
        expect(status).toHaveTextContent("failure");
      });
    });
  });

  test("should update accountRequestId and signerId in the state", async () => {
    const propsForInviteesOnboarding = {
      ...props,
      accountRequestId: "some-account-request-id",
      signerId: "some-signer-id",
    };
    // arrange
    renderApp(propsForInviteesOnboarding);

    // act
    fireEvent.click(screen.getByTestId("updateIds"));

    // assert
    await waitFor(async () => {
      const accountRequestIdElement = screen.getByText(
        propsForInviteesOnboarding.accountRequestId
      );
      expect(accountRequestIdElement).toBeInTheDocument();

      const signerIdElement = screen.getByText(
        propsForInviteesOnboarding.signerId
      );
      expect(signerIdElement).toBeInTheDocument();
    });
  });

  test("should setInvitees in the state", async () => {
    const propsWithInvitees = {
      ...props,
      invitees: [
        {
          id: "id1",
          role: "SECONDARY",
          email: "john@hotmail.com",
        } as IInvitedSigner,
        {
          id: "id2",
          role: "SECONDARY",
          email: "johnParson@hotmail.com",
        } as IInvitedSigner,
      ],
    };
    // arrange
    renderApp(propsWithInvitees);

    // act
    fireEvent.click(screen.getByTestId("setInvitees"));

    // assert
    await waitFor(async () => {
      const inviteeMap = screen.getAllByTestId("invitee-item");
      expect(inviteeMap).toHaveLength(propsWithInvitees.invitees.length);

      const inviteeIdsMap = screen.getAllByTestId("invitee-id");
      expect(inviteeIdsMap).toHaveLength(propsWithInvitees.invitees.length);

      const inviteeEmailMap = screen.getAllByTestId("invitee-email");
      expect(inviteeEmailMap).toHaveLength(propsWithInvitees.invitees.length);

      const inviteeRoleMap = screen.getAllByTestId("invitee-role");
      expect(inviteeRoleMap).toHaveLength(propsWithInvitees.invitees.length);
    });
  });

  test("should update product in the state", async () => {
    const testProps = {
      ...props,
    };
    // arrange
    renderApp(testProps);

    // act
    fireEvent.click(screen.getByTestId("addProduct"));

    // assert
    await waitFor(async () => {
      const elProdId = screen.getByText(testProps.selectedProduct.id);
      expect(elProdId).toBeInTheDocument();

      const elName = screen.getByText(testProps.selectedProduct.name);
      expect(elName).toBeInTheDocument();
    });
  });

  test("should update initial Deposit in the state", async () => {
    const testProps = {
      ...props,
      product: {
        initialDeposit: 500099,
      },
    };
    // arrange
    renderApp(testProps);

    // act
    fireEvent.click(screen.getByTestId("addProduct"));
    fireEvent.click(screen.getByTestId("changeInitialDeposit"));

    // assert
    await waitFor(async () => {
      const elProdId = screen.getByText(testProps.selectedProduct.id);
      expect(elProdId).toBeInTheDocument();

      const elName = screen.getByText(testProps.selectedProduct.name);
      expect(elName).toBeInTheDocument();

      const elDeposit = screen.getByText(
        testProps.product.initialDeposit.toString()
      );
      expect(elDeposit).toBeInTheDocument();
    });
  });
});
