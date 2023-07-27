import axios, { AxiosError } from "axios";
import Config from "./Config";

// Note: if you need to check the result from the requests, uncomment these:
// axios.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request
// })

// axios.interceptors.response.use(response => {
//   console.log('Response:', response)
//   return response
// })

/* Logic for accessing CoreAPI */
class CoreAPI {
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
      return "Cannot connect to Server. Please check your connection.";
    }
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }

  /**
   * API Request handler
   * @param url - api endpoint
   * @param method - http method
   * @param bodyParams - body parameters of request
   */
  public async putRequest(
    url: string,
    body: any,
    bodyParams?: any
  ): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const requestURL = `${Config.coreAPI}${url}`;
    const response = await axios.put(requestURL, body, {
      ...config,
      params: bodyParams,
    });
    return await response.data;
  }

  /**
   * API Request handler
   * @param url - api endpoint
   * @param bodyParams - body parameters of request
   * @param returnFullResponse - if you want to get the full response
   */
  public async postRequest(
    url: string,
    body: any,
    returnFullResponse?: boolean
  ): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const requestURL = `${Config.coreAPI}${url}`;
    const response = await axios.post(requestURL, body, {
      ...config,
    });

    if (returnFullResponse) {
      return response;
    }
    return response.data;
  }

  /**
   * API Request handler
   * @param url - api endpoint
   * @param method - http method
   * @param bodyParams - body parameters of request
   */
  public async getRequest(url: string, bodyParams?: any): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const requestURL = `${Config.coreAPI}${url}`;
    const response = await axios.get(requestURL, {
      ...config,
      params: bodyParams,
    });
    return await response.data;
  }

  public setAuthenticationHeader(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default CoreAPI;
