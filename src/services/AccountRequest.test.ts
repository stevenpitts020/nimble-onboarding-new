import AccountRequestService from "./AccountRequest";
import {
  createSuccessResponse,
  updateSuccessResponse,
  updateStatusSuccessResponse,
  bsaSucessResponse,
  bsaQuestions,
} from "./__mocks__/AccountRequest";

describe("Account Request Service", () => {
  it("should create a Account Request", async () => {
    const result = await AccountRequestService.createAccountRequest({
      institutionId: "2552ab85-08da-4bb5-be00-9e94d282d311",
      productConfigurations: [
        {
          productId: "95554751-51d1-4f37-9785-417ae5251d56",
          initialDeposit: 1099,
          options: [
            {
              key: "loan_max_value",
              title: "Loan Max Value",
              category: "category",
              value: "Example",
            },
          ],
        },
      ],
    });
    expect(result.data).toEqual(createSuccessResponse);
  });

  it("should update a Account Request", async () => {
    const accountRequestId = "018f339a-e828-431d-98bf-a51758f28536";
    const updatePayload = {
      status: "",
      accountRequestId,
      productConfigurations: [
        {
          productId: "95554751-51d1-4f37-9785-417ae5251d56",
          initialDeposit: 2000,
          options: [
            {
              key: "loan_max_value",
              title: "Loan Max Value",
              category: "category",
              value: "Example",
            },
          ],
        },
      ],
    };
    const result = await AccountRequestService.updateAccountRequest(
      "",
      accountRequestId,
      updatePayload
    );
    expect(result).toEqual(updateSuccessResponse);
  });

  it("should update a Account Request status", async () => {
    const accountRequestId = "018f339a-e828-431d-98bf-a51758f28536";
    const result = await AccountRequestService.updateAccountRequest(
      "",
      accountRequestId,
      { status: "INCOMPLETE" }
    );
    expect(result).toEqual(updateStatusSuccessResponse);
  });

  it("should upsert the BSA Questionnaire", async () => {
    const accountRequestId = "018f339a-e828-431d-98bf-a51758f28536";
    const bsaQuestionnairePayload = {
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
    };
    const result = await AccountRequestService.createBSAQuestionnaire(
      "",
      accountRequestId,
      bsaQuestionnairePayload,
      bsaQuestions
    );
    expect(result).toEqual(bsaSucessResponse);
  });
});
