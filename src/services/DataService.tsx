import CoreAPI from "./CoreAPI";

class DataService extends CoreAPI {

  public async person(phone: string) {
    return await this.getRequest(`/data/api?method=get&path=people&phone=${phone}`);
  }
}

export default new DataService();
