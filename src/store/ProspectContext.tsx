import React, { useReducer, useCallback, useContext } from "react";

import moment from "moment";
import * as Sentry from "@sentry/react";
import * as _ from "lodash";
import AccountRequestService from "../services/AccountRequest";
import SignerService from "../services/Signer";
import { log } from "../services";
import { IDocuments } from "./DocumentsContextType";
import FormatHelper from "../utils/FormatHelper";
import { IConsents } from "./ConsentsContextType";
import { setPersistState, getPersistState } from "../utils/PersistState";
import { ISigner } from "../services/types";
import {
  IInviteData,
  IProofDocument,
  IProspectContext,
  IProvider,
} from "./ProspectContextType";

import { magicStrings } from "../utils/constants/magicStrings";

import { AxiosError } from "axios";

import {
  IInvitedSigner,
  initialState,
  IProduct,
  IProductOption,
  IReducer,
  ISignerDetails,
} from "./reducers/type";
import reducer from "./reducers/ProspectReducer";
import { InstitutionContext } from "./InstitutionContext";

// export this because we will be using it in components
// like this: const { personalInfo } = useContext(ProspectContext)
export const ProspectContext = React.createContext({} as IProspectContext);

interface ErrorResponseData {
  response: {
    data: object;
  };
}

export const ProspectProvider = (props: IProvider) => {
  const [prospect, dispatch] = useReducer<IReducer>(
    reducer,
    props.initialProviderState || getPersistState("PROSPECT") || initialState
  );

  React.useEffect(() => {
    setPersistState("PROSPECT", prospect);
  }, [prospect]);

  const institution = useContext(InstitutionContext);

  /**
   * Validate signer personal info inside Prospect
   * @param payload - Signer details
   */
  const validateSigner = async (payload: ISignerDetails) => {
    log.info(prospect, "validateSigner");

    const accountRequestId = prospect.accountRequestId
      ? prospect.accountRequestId
      : "";
    const { signerId } = prospect;

    if (!accountRequestId && !signerId && prospect.status === "signerReady") {
      // update primary signer validation state
      dispatch({
        type: "updateSignerValidation",
        payload: true,
      });
    } else if (signerId) {
      let validated = false;
      let returnResults;
      try {
        const validatePayload = {
          ...payload,
          accountRequestId,
          id: signerId,
          role: "SECONDARY",
        } as ISigner;
        const results = await SignerService.validateSigner(
          signerId,
          accountRequestId,
          _.omit(
            validatePayload,
            "role",
            "documentType",
            "documentIssuer",
            "documentIssuedDate"
          ) as ISigner
        );
        log.info(
          `Signer validated by server ${JSON.stringify(results, null, "\t")}`,
          "validateSigner"
        );
        validated = true;
        returnResults = results;
      } catch (error) {
        Sentry.captureException(error);
        log.error((error as ErrorResponseData).response.data, "validateSigner");
        if (_.isEmpty((error as ErrorResponseData).response.data[signerId])) {
          // If there are no duplicates for this signer, we allow further updates to continue for this signer
          validated = true;
        }
        returnResults = (error as ErrorResponseData).response.data;
      }
      // update signer validation state
      dispatch({
        type: "updateSignerValidation",
        payload: validated,
      });
      return returnResults;
    }
  };

  /**
   * Update signer personal info inside Prospect
   * @param payload - Signer details
   */
  const updateSigner = async (payload: ISignerDetails) => {
    dispatch({ type: "updatePersonalInfo", payload });
  };
  /**
   * Remove all data. Return to initial state
   */
  const resetProspect = () => {
    // remove all this from storage to prevent side-effects
    window.sessionStorage.clear();
    dispatch({ type: "reset" });
  };

  const finishProspect = () => {
    dispatch({ type: "finish" });
  };

  const addInvitee = useCallback((data: IInviteData) => {
    dispatch({
      type: "updateProspectSigner",
      accountRequestId: data.accountRequestId,
      signerId: data.signerId,
      securityToken: data.inviteeToken,
    });
  }, []);

  /** fill the information in the state (this way we fill the form) */
  async function populateProspectWithFields(
    licenceFrontId: string,
    licenseBackId: string
  ) {
    try {
      // check if we were able to get data from the document or if we need to run the identityVerification
      const isEmpty = !Object.entries(prospect.signer).some(
        ([key, x]) =>
          key !== "documentType" &&
          key !== "validated" &&
          x !== "" &&
          x !== undefined
      );
      if (isEmpty) {
        const response = await SignerService.identityVerification(
          licenceFrontId,
          licenseBackId
        );

        // deconstruct fields from api
        const {
          firstName,
          middleName,
          lastName,
          address,
          city,
          state,
          zipCode,
          employer,
          documentNumber,
          documentType,
        } = response;
        let {
          dateOfBirth,
          documentExpirationDate,
          documentIssuedDate,
          documentIssuer,
        } = response;

        // prepare dates for safari
        const dateOfBirthArray =
          dateOfBirth !== null
            ? dateOfBirth.split("-")
            : "1977-01-01".split("-");
        const documentExpirationDateArray =
          documentExpirationDate !== null
            ? documentExpirationDate.split("-")
            : "1977-01-01".split("-");
        const documentIssuedDateArray =
          documentIssuedDate !== null
            ? documentIssuedDate.split("-")
            : "1977-01-01".split("-");
        dateOfBirth = `${dateOfBirthArray[0]}-${
          dateOfBirthArray[1].length > 1
            ? dateOfBirthArray[1]
            : `0${dateOfBirthArray[1]}`
        }-${
          dateOfBirthArray[2].length > 1
            ? dateOfBirthArray[2]
            : `0${dateOfBirthArray[2]}`
        }`;
        documentExpirationDate = `${documentExpirationDateArray[0]}-${
          documentExpirationDateArray[1].length > 1
            ? documentExpirationDateArray[1]
            : `0${documentIssuedDateArray[1]}`
        }-${
          documentExpirationDateArray[2].length > 1
            ? documentExpirationDateArray[2]
            : `0${documentIssuedDateArray[2]}`
        }`;
        documentIssuedDate = `${documentIssuedDateArray[0]}-${
          documentIssuedDateArray[1].length > 1
            ? documentIssuedDateArray[1]
            : `0${documentIssuedDateArray[1]}`
        }-${
          documentIssuedDateArray[2].length > 1
            ? documentIssuedDateArray[2]
            : `0${documentIssuedDateArray[2]}`
        }`;

        log.info(
          { dateOfBirth, documentExpirationDate, documentIssuedDate },
          "before date parsing"
        );

        if (
          !FormatHelper.isValidDate(documentExpirationDate) ||
          documentExpirationDate === "1970-01-01"
        ) {
          documentExpirationDate = moment().format("YYYY-MM-DD");
        }

        if (
          !FormatHelper.isValidDate(dateOfBirth) ||
          dateOfBirth === "1970-01-01"
        ) {
          dateOfBirth = undefined;
        }

        if (
          !FormatHelper.isValidDate(documentIssuedDate) ||
          documentIssuedDate === "1970-01-01"
        ) {
          documentIssuedDate = undefined;
        }

        log.info(
          { dateOfBirth, documentExpirationDate, documentIssuedDate },
          "after transform dates"
        );

        if (documentIssuer === "" || documentIssuer === null) {
          documentIssuer = state;
        }
        // Update State
        await updateSigner({
          ...prospect.signer,
          firstName,
          middleName,
          lastName,
          address,
          city,
          state,
          zipCode,
          employer,
          dateOfBirth,
          documentType,
          documentNumber,
          documentExpirationDate,
          documentIssuedDate,
          documentIssuer,
        });
      }
    } catch (error) {
      // Note: although it's important that this fails. We don't want to show an error on the screen.
      log.error(error, "identityVerification");
    }
  }

  /**
   * Creates a new prospect or updates an existing one on the server.
   * TODO: This method has too many responsibilities. It should be refactored.
   * @param institutionId - institution id
   * @param documents - user documents
   * @param consents - user consents
   * @param bsa - questionaire
   */
  const sendDataToServer = async (
    institutionId: string,
    documents: IDocuments,
    consents: IConsents,
    bsa: any
  ) => {
    log.info(prospect, "sendDataToServer");

    // we're going to need this to take a decision up ahead and to to some damage control
    const isNewAccountRequest = prospect.accountRequestId === undefined;

    try {
      if (institutionId === "") {
        throw Error("no institution ID");
      }
      if (prospect.status === "success") {
        throw Error("You already finished the account process.");
      }
      if (
        !prospect.signer.documentNumber ||
        !prospect.signer.documentExpirationDate ||
        !prospect.signer.documentIssuedDate ||
        !prospect.signer.documentIssuer ||
        !prospect.signer.documentType ||
        FormatHelper.isEmpty(documents.selfie?.id) ||
        FormatHelper.isEmpty(documents.front?.id) ||
        (typeof prospect.accountRequestId === "undefined" &&
          FormatHelper.isEmpty(prospect.products))
        // this means that we have normal signer who must at this point select a product
      ) {
        log.error("Missing information necessary for api", "sendDataToServer");
        throw Error(
          "Some information about your Onboarding process is missing."
        );
      }

      let accountRequestId = prospect.accountRequestId
        ? prospect.accountRequestId
        : "";
      const idProofDocument: IProofDocument = {
        type: prospect.signer.documentType,
        number: prospect.signer.documentNumber,
        expirationDate: prospect.signer.documentExpirationDate,
        issuedDate: prospect.signer.documentIssuedDate,
        issuer: prospect.signer.documentIssuer,
        frontDocumentId: documents.front!.id,
      };

      if (idProofDocument.type === "USDL") {
        idProofDocument.backDocumentId = documents.back!.id;
      }
      const {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        phoneNumber,
        email,
        address,
        city,
        state,
        zipCode,
        employer,
        ssn,
      } = prospect.signer;
      const signer: ISigner = {
        firstName,
        middleName,
        lastName,
        role: "PRIMARY",
        dateOfBirth,
        phoneNumber,
        email,
        address,
        city,
        state,
        zipCode,
        employer,
        ssn,
        consent: consents.terms,
        consentAccountOpening: consents.initial,
        consentPrivacyPolicy: consents.terms,
        consentCommunication: consents.terms,
        selfieDocumentId: documents.selfie!.id,
        idProofDocument,
        accountRequestId,
      };
      const { signerId, securityToken } = prospect;

      // Create account request
      if (isNewAccountRequest) {
        const create = {
          institutionId,
          productConfigurations: prospect.products,
        };
        const referredById = sessionStorage.getItem(
          magicStrings.props.referredById
        );

        const accountRequestResp =
          await AccountRequestService.createAccountRequest(
            referredById ? _.merge(create, { referredById }) : create
          );
        log.info("Created account request", "ProspectContext");

        const token = accountRequestResp.headers["x-nimble-token"];
        accountRequestId = accountRequestResp.data.id;
        dispatch({
          type: "updateProspectSigner",
          accountRequestId,
          tokens: [{ id: "accountRequestToken", token }],
        });
        // Upsert BSA Questionnaire
        if (token) {
          await AccountRequestService.createBSAQuestionnaire(
            token,
            accountRequestId,
            bsa,
            institution?.publicMetadata?.bsa
          );
          log.info("Upserted BSA Questionnaire", "ProspectContext");
          // create signer
          signer.accountRequestId = accountRequestId;
          const resp = await SignerService.createSigner(token, signer);
          log.info("Signer created", "SendaDataToServer");
          // create one Signer per invitee
          for (const invitee of prospect.invitees) {
            const inviteeResp = await SignerService.createSigner(token, {
              email: invitee.email,
              role: "SECONDARY",
              accountRequestId,
            });
            if (inviteeResp.data.id) {
              dispatch({
                type: "updateProspectSigner",
                accountRequestId,
                signerId: inviteeResp.data.id,
                securityToken: inviteeResp.headers["x-nimble-token"],
                tokens: [
                  {
                    id: inviteeResp.data.id,
                    token: inviteeResp.headers["x-nimble-token"],
                  },
                ],
              });
            }
          }
          const accountRequestUpdateResp =
            await AccountRequestService.updateAccountRequest(
              token,
              accountRequestId,
              {
                status: "INCOMPLETE",
              }
            );
          log.info("updated Account Request", "ProspectContext");
          sessionStorage.setItem(
            "invitees",
            JSON.stringify(accountRequestUpdateResp.signers)
          );
          dispatch({
            type: "updateProspectSigner",
            accountRequestId,
            signerId: resp.data.id,
            securityToken: resp.headers["x-nimble-token"],
            tokens: [
              { id: resp.data.id, token: resp.headers["x-nimble-token"] },
            ],
          });
          dispatch({
            type: "updateInvitedBy",
            invitedBy: {
              id: resp.data.id,
              firstName: resp.data.firstName,
              email: resp.data.email!,
            },
          });
        }
      } else {
        // update a signer
        if (signerId && securityToken) {
          const token =
            (prospect.tokens || []).find((el) => el.id === signerId)?.token! ||
            securityToken;
          await SignerService.updateSigner(token, signerId, signer);
          log.info(
            "Signer updated with signer info on server",
            "sendDataToServer"
          );
          dispatch({
            type: "updateInvitedBy",
            invitedBy: {
              id: prospect.signer.id!,
              firstName: prospect.signer.firstName!,
              email: prospect.signer.email!,
            },
          });
        }
      }

      // set status ready to sign contract
      dispatch({ type: "createEmbedView" });
    } catch (error) {
      Sentry.captureException(error);
      log.error(error, "sendDataToServerError");

      // damage control: if it's a new account request,
      // remove accountrequestid and tokens from state so that we can create a new one
      // after user fixes the problem.
      // better solution: refactor everything ahead and keep a record of what was inserted or not to resume
      // (ie: which signer, bsa)
      if (isNewAccountRequest) {
        dispatch({ type: "resetBrokenAccountRequest" });
      }

      // set failure status and error message
      dispatch({
        type: "error",
        error: SignerService.errorMessage(error as AxiosError<unknown, any>),
      });
    }
  };

  const setInvitees = (invitees: IInvitedSigner[]) => {
    dispatch({ type: "invitees", payload: invitees });
  };

  const addProduct = (product: IProduct) => {
    dispatch({ type: "addProduct", product });
  };

  const updateInitialDeposit = (initialDeposit: number) => {
    // note: Dont forget to multiply amount by 100 to transform into a integer with cents, ie: 500.99 = 50099
    dispatch({ type: "updateInitialDeposit", initialDeposit });
  };

  const updateProductOptions = (productOptions: IProductOption[]) => {
    dispatch({ type: "updateProductOptions", productOptions });
  };

  const setError = useCallback((message: string) => {
    dispatch({ type: "error", error: message });
  }, []);

  const cleanSignerInformation = () => {
    // keep the email, forget the rest
    // note: should we remove bsa and product options as well??
    updateSigner({
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: prospect.signer.email,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      employer: "",
      ssn: "",
      documentType: "",
      documentNumber: "",
      documentExpirationDate: "",
      documentIssuedDate: "",
      documentIssuer: "",
      selfieDocumentId: "",
      consent: false,
    });
  };

  return (
    <ProspectContext.Provider
      value={{
        prospect,
        validateSigner,
        updateSigner,
        resetProspect,
        sendDataToServer,
        populateProspectWithFields,
        setInvitees,
        addInvitee,
        addProduct,
        updateInitialDeposit,
        updateProductOptions,
        setError,
        finishProspect,
        cleanSignerInformation,
      }}
    >
      {props.children}
    </ProspectContext.Provider>
  );
};
