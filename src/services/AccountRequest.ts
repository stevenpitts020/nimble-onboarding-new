import _ from "lodash";
import CoreAPI from "./CoreAPI";
import { IAccountRequest } from "./types";

/* Logic for creating and retrieving AccountRequest information from core api */
class AccountRequest extends CoreAPI {
  public async createAccountRequest(accountRequest: IAccountRequest) {
    return await this.postRequest("/account-requests", accountRequest, true);
  }

  /* Update Account Request */
  public async updateAccountRequest(
    token: string,
    id: string,
    accountRequest: { status: string }
  ) {
    this.setAuthenticationHeader(token);
    return await this.putRequest(`/account-requests/${id}`, accountRequest);
  }

  /* Get Account Request */
  public async getAccountRequest(token: string, accountRequestId: string) {
    this.setAuthenticationHeader(token);
    return await this.getRequest(`/account-requests/${accountRequestId}`);
  }

  /* Upsert the BSA Questionnaire results by account request Id */
  public async createBSAQuestionnaire(
    token: string,
    id: string,
    bsa: any,
    questions: any
  ) {
    this.setAuthenticationHeader(token);
    const bsaRiskResults = _.sortBy(
      this.formatQuestionnaireResults(bsa, questions),
      "order"
    );
    return await this.postRequest(
      `/account-requests/${id}/bsa-risk-results`,
      bsaRiskResults
    );
  }

  /**
   * Convert between bsa from our state to the bsaRiskResults format which the api needs
   * @param bsa - any
   * @param questions - any: {id: 'answer'} question metadata
   */
  public formatQuestionnaireResults(bsa: any, questions: any) {
    let index = 0;

    return _.map(bsa, (answer, id) => {
      return {
        questionId: id,
        answer: answer || null,
        position: questions[id]?.order || index++,
      };
    });
  }
}

export default new AccountRequest();
