import { AxiosError } from "axios";
import CoreAPI from "./CoreAPI";
import { ISigner, IVerifyEmail } from "./types";

/* Logic for creating and retrieving Signer information from core api */
class Signer extends CoreAPI {
  public NETWORK_ERROR_MSG_SIGNER =
    "Cannot connect to Server. Please check your connection.";

  public SERVER_ERROR_MSG_SIGNER = "Something unexpected happened!";

  /**
   * Get a identity data from personal documents
   *
   * @param frontDocumentId - frontDocumentId
   * @param backDocumentId - backDocumentId
   */
  public async identityVerification(
    frontDocumentId: string,
    backDocumentId: string
  ) {
    return await this.getRequest(
      `/prospects/identities/${frontDocumentId}/${backDocumentId}`
    );
  }

  /**
   * Create a signer on Nimble
   *
   * @param institutionId - institution id
   * @param invitees - list of invitess associated with this prospect,
   * @param signer - Personal info of the signer
   *
   */

  public async createSigner(token: string, signer: ISigner) {
    this.setAuthenticationHeader(token);
    return await this.postRequest("/signers", signer, true);
  }

  /**
   * get a Signer by Id
   */
  public async getSigner(token: string, signerId: string) {
    this.setAuthenticationHeader(token);
    return await this.getRequest(`/signers/${signerId}`);
  }

  /**
   * Update a Signer
   */
  public async updateSigner(token: string, signerId: string, signer: ISigner) {
    this.setAuthenticationHeader(token);
    const parsedSigner = {
      firstName: signer.firstName,
      middleName: signer.middleName,
      lastName: signer.lastName,
      address: signer.address,
      city: signer.city,
      state: signer.state,
      zipCode: signer.zipCode,
      phoneNumber: signer.phoneNumber,
      employer: signer.employer,
      ssn: signer.ssn,
      email: signer.email,
      dateOfBirth: signer.dateOfBirth,
      consent: signer.consent,
      consentAccountOpening: signer.consentAccountOpening,
      consentPrivacyPolicy: signer.consentPrivacyPolicy,
      consentCommunication: signer.consentCommunication,
      idProofDocument: signer.idProofDocument,
      selfieDocumentId: signer.selfieDocumentId,
    };
    return await this.putRequest(`/signers/${signerId}`, parsedSigner, true);
  }

  /**
   * Validate a Signer
   */
  public async validateSigner(
    signerId: string,
    accountRequestId: string,
    signer: ISigner
  ) {
    const parsedSigner = {
      ...signer,
      id: signerId,
      accountRequestId,
    };
    return await this.postRequest(
      `/signers/${signerId}/validate`,
      parsedSigner,
      true
    );
  }

  /**
   * Confirm the email of the signer
   */
  public async signerConfirmEmail(
    signerId: string,
    verficationId: string,
    token: string
  ) {
    this.setAuthenticationHeader(token);
    return await this.putRequest(
      `/signers/${signerId}/email-verifications/${verficationId}?token=${token}`,
      {}
    );
  }

  /**
   * Create a signer invite
   */
  public async createSignerInvite(token: string, signerId: string) {
    this.setAuthenticationHeader(token);
    return await this.postRequest(`/signers/${signerId}/invites`, true);
  }

  /**
   * Send Signer Email Verification by Id
   *
   * @param signerId - signer id
   * @param token - auth token
   */
  public async createEmailVerification({ signerId, token }: IVerifyEmail) {
    const response = await this.postRequest(
      `/signers/${signerId}/email-verifications?token=${token}`,
      null,
      false
    );
    return response.data;
  }

  /**
   * Get a embed contract view url
   *
   * @param url - url for the embed signature view,
   * like: `/v1/${result.id}/signers/${result.signer.id}/contract`
   * @param token - security token required by the API
   */
  public async getEmbedSignView(url: string, token: string) {
    this.setAuthenticationHeader(token);
    return await this.getRequest(url);
  }

  /**
   * Return a single error message
   *
   * @param error - axios error
   */
  public errorMessage(error: AxiosError<any, any>) {
    if (error.response) {
      // Request made and server responded
      const parsedMessage = this.parseServerMessage(
        error.response.data?.message
      );
      return parsedMessage;
    }
    if (error.request) {
      // The request was made but no response was received
      return this.NETWORK_ERROR_MSG_SIGNER;
    }
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }

  /**
   * Improve the error message from the server
   *
   * @param message - string
   */
  public parseServerMessage(message: string) {
    const msg = message;
    let parsedMessage = "";
    // remove signer. from string
    parsedMessage = msg.replace(/signer./g, "");
    // replace error msg
    parsedMessage = parsedMessage.replace(
      "The minimal required parameters for this endpoint were not met.",
      "Please review the following issues with your information:"
    );
    // replace "something" with Something
    parsedMessage = parsedMessage.replace(/"(.*?)"/g, (match: any) => {
      const removeQuotes = match.substr(1, match.length - 2);
      const pascalCase = removeQuotes[0].toUpperCase() + removeQuotes.substr(1);
      return pascalCase.match(/($[a-z])|[A-Z][^A-Z]+/g)?.join(" ");
    });

    return parsedMessage;
  }

  /**
   * Improve the error message from the Docusign Embed Response
   *
   * @param query - a string event from the Docusign Embed Response
   */
  public parseDocusignEventQuery(query: string) {
    let parsedMessage;

    switch (query) {
      case "?event=cancel":
        parsedMessage =
          "You canceled the signing operation, possibly by using the Finish Later option.";
        break;
      case "?event=decline":
        parsedMessage =
          "You declined to sign the contract. Do you want to try again?";
        break;
      case "?event=exception":
        parsedMessage =
          "A system error occurred during the signing process. Please try again.";
        break;
      case "?event=ttl_expired":
      case "?event=session_timeout":
        parsedMessage = "The session timed out. Please try again.";
        break;
      case "?event=viewing_complete":
        parsedMessage =
          "The contract was already signed. Please check your email to download the complete version.";
        break;
      default:
        parsedMessage = "There was a problem while fetching your contract.";
    }

    return parsedMessage;
  }
}

export default new Signer();
