import { AxiosError } from "axios";
import CoreAPI from "./CoreAPI";
import { IDocument } from "./types";

/* Logic for Documents in core api */
class Document extends CoreAPI {
  /**
   * Create a document on Nimble
   *
   * @param payload - body parameters of request
   */
  public async create(payload: IDocument) {
    return await this.postRequest("/documents", payload);
  }

  /**
   * Return a single error message
   *
   * @param error - axios error
   */
  public errorMessage(error: AxiosError<any, any>) {
    if (error.response) {
      // Request made and server responded
      return error.response.data.message;
    }
    if (error.request) {
      // The request was made but no response was received
      return "We were unable to upload your photo. Make sure you have an internet connection and try again.";
    }
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
}

export default new Document();
