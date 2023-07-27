import CoreAPI from "./CoreAPI";

/* Logic for Signers in core api */
class Institution extends CoreAPI {
  /**
   * Gets an institution by its domain
   *
   * @param domain - domain of the institution
   */
  public async get(domain: string) {
    return await this.getRequest(`/institutions/${domain}`);
  }

  public async getProducts(insitutionId: string) {
    return await this.getRequest(`/institutions/${insitutionId}/products`);
  }
}

export default new Institution();
