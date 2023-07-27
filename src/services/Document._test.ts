/*
import { document as service } from ".";
import * as mocks from "./__mocks__/Photos";

// this makes actual api call
describe("Document", () => {
  describe("create", () => {
    it("should push a image", async () => {
      const params = {
        content: "c2luZ3VsYXI=",
        format: "image",
        institutionId: "institutionidmock",
      };

      const result = await service.create(params);

      expect(result.id).toEqual(mocks.successCreate.id);
      expect(result.format).toEqual(params.format);
    });

    it("should return error", async () => {
      const params = {
        content: "test123",
        format: "image",
        institutionId: "",
      };

      try {
        await service.create(params);
      } catch (error) {
        expect(error.response.data.step).toEqual(undefined);
        expect(error.response.data).toHaveProperty(
          "message",
          mocks.errorCreate.message
        );
        expect(error.response.data).toHaveProperty(
          "statusCode",
          mocks.errorCreate.statusCode
        );
      }
    });
  });
});
*/
