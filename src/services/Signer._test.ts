/*
import SignerService from "./Signer";
import {
  identityInformationSuccess,
  errorUpdate,
  postToCreateProspectSuccess,
  validSigner,
  putToUpdateProspectSuccess,
  prospectSignerSigned,
} from "./__mocks__/Signer";

// this makes actual api call
describe("Signer", () => {
  describe("parseServerMessage", () => {
    it("should replace server msg with multiple finds", async () => {
      const message =
        // tslint:disable-next-line: max-line-length
        "The minimal required parameters for this endpoint were not met." +
        ' "signer.ssn" is too wild.  "signer.address" is too large.';

      const result = await SignerService.parseServerMessage(message);

      expect(result).toEqual(
        // tslint:disable-next-line: max-line-length
        "Please review the following issues with your information: Ssn is too wild.  Address is too large."
      );
    });

    it("should replace not jeopardize other server messages", async () => {
      const message = "Something is wrong.";

      const result = await SignerService.parseServerMessage(message);
      expect(result).toEqual(message);
    });
  });

  describe("identityVerification", () => {
    it("should get identity information", async () => {
      const params = {
        frontDocumentId: "123",
        backDocumentId: "456",
      };
      const result = await SignerService.identityVerification(
        params.frontDocumentId,
        params.backDocumentId
      );
      expect(result.firstName).toEqual(identityInformationSuccess.firstName);
      expect(result.lastName).toEqual(identityInformationSuccess.lastName);
      expect(result.address).toEqual(identityInformationSuccess.address);
    });

    it("should return error", async () => {
      const params = {
        frontDocumentId: "errorId",
        backDocumentId: "456",
      };

      try {
        await SignerService.identityVerification(
          params.frontDocumentId,
          params.backDocumentId
        );
      } catch (error) {
        expect(error.response.data).toHaveProperty(
          "message",
          errorUpdate.message
        );
        expect(error.response.data).toHaveProperty(
          "statusCode",
          errorUpdate.statusCode
        );
      }
    });
  });

  describe("create signer", () => {
    it("should post data to server succesfully", async () => {
      const idProofDocument = {
        number: "123-123",
        expirationDate: "date",
        issuedDate: "date",
        frontDocumentId: "uuid",
        backDocumentId: "uuid",
        issuer: "PT",
      };
      const signer = {
        ...validSigner,
        idProofDocument,
      };
      const response = await SignerService.createSigner("token", signer);
      const result = response.data;
      expect(result.signer.firstName).toEqual(
        postToCreateProspectSuccess.signer.firstName
      );
      expect(result.signer.idProofDocument.number).toEqual(
        postToCreateProspectSuccess.signer.idProofDocument.number
      );
    });
  });

  describe("update one of prospect signers", () => {
    it("should PUT data to server succesfully", async () => {
      const params = {
        accountRequestId: "sdsh-223d-23nd-n2k2",
        signerId: "sdsk-ca32-bda2-8sj2",
        idProofDocument: {
          number: "123-123",
          expirationDate: "date",
          issuedDate: "date",
          frontDocumentId: "2as8-7sad-87sa-sa97",
          backDocumentId: "ads8-929e-hb2k-je22",
          issuer: "",
        },
      };
      const signer = {
        ...validSigner,
        idProofDocument: params.idProofDocument,
      };
      const result = await SignerService.updateSigner(
        params.accountRequestId,
        params.signerId,
        signer
      );
      expect(result.firstName).toEqual(putToUpdateProspectSuccess.firstName);
      expect(result.idProofDocument.number).toEqual(
        putToUpdateProspectSuccess.idProofDocument.number
      );
    });
  });

  describe("email verification", () => {
    it("should create verify email", async () => {
      const result = await SignerService.createEmailVerification({
        signerId: "1",
        token: "demo",
      });
      expect(result).toEqual(undefined);
    });

    it("return error", async () => {
      try {
        await SignerService.createEmailVerification({
          signerId: prospectSignerSigned.id,
          token: "demo",
        });
      } catch (error) {
        expect(error.response.data).toHaveProperty(
          "message",
          errorUpdate.message
        );
        expect(error.response.data).toHaveProperty(
          "statusCode",
          errorUpdate.statusCode
        );
      }
    });
  });
});
*/
