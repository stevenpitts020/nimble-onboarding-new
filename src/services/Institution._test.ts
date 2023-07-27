/*
import { institution as service } from ".";
import { listProducts } from "./__mocks__/Products";
import { mockInstitution } from "./__mocks__/Institution";

describe("Institution Service", () => {
  describe("get", () => {
    it("should get an institution", async () => {
      const result = await service.get("wearesingular.com");
      expect(result).toEqual(mockInstitution);
    });

    it("should return error", async () => {
      try {
        await service.get("somedomain.com");
      } catch (error) {
        expect(error.message).toEqual("Request failed with status code 404");
      }
    });

    it("should return list of products", async () => {
      const id = "f1f34235-bcaf-4429-8d4f-646b961d0d80";

      const result = await service.getProducts(id);
      expect(result).toEqual(listProducts);
    });
  });
});
*/
