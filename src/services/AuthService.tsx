import axios, { AxiosError } from "axios";
import CoreAPI from "./CoreAPI";
import Config from "./Config";
import { getSuccessResponse } from "./__mocks__/AccountRequest";

/* Logic for authentication */
class AuthService extends CoreAPI {
  // public async verifyCode(code: string) {
  //   const mfaCacheToken = this.getMFACacheToken();

  //   return await this.postRequest("/auth/verify-code", { mfaCacheToken, code });
  // }

  /**
   * Login in the api
   * @param phone - user password
   */
  public async login(phone: string) {
    return Config.mockAPI
      ? { token: "mock-token" }
      : await this.postRequest(
          `/auth/${Config.microblinkAuth && phone ? "login" : "magic-link"}`, // path
          { phone, host: window?.location?.host } // credentials
        );
  }

  public async setPhone(phone: string) {
    return await this.putRequest("/me", {
      phone,
    });
  }

  public async changePassword(phone: string) {
    if (Config.mockAPI) {
      return {
        token: "mock-token",
      };
    }
    const userData = await this.putRequest("/me", {
      phone,
    });
    return userData;
  }
  public async authToken(data: any) {
    return await this.postRequest(`/auth/auth-tokens`, data);
  }

  public async verifyCode(phone: string, authCode: string) {
    return await this.postRequest(`/auth/verify-user-code`, {
      payload: {
        id: phone,
        verificationCode: authCode,
      },
    });
  }

  public async getMe(token) {
    if (Config.mockAPI) {
      return getSuccessResponse;
    }
    this.setAuthenticationHeader(token);
    return await this.getRequest("/me");
  }

  public async getAccountRequest(token) {
    this.setAuthenticationHeader(token);
    return await this.getRequest(`/account-requests`);
  }

  /* return the access token in storage */
  public getAccessToken(): string | null {
    return sessionStorage.getItem("access_token");
  }

  /**
   * save access token in store
   * @param token - auth token to store
   */
  public saveAccessToken(token: string): void {
    // TODO save expires at?
    return sessionStorage.setItem("access_token", token);
  }

  /* remove token from store */
  public removeAccessToken(): void {
    // Remove the HTTP header that include the JWT token
    delete axios.defaults.headers.common.Authorization;
    // Delete the token from our session
    return sessionStorage.removeItem("access_token");
  }

  public getMFACacheToken(): string | null {
    return localStorage.getItem("mfa_cache_token");
  }

  public getMFAMaskedPhone(): string | null {
    return localStorage.getItem("mfa_masked_phone");
  }

  public saveMFACacheToken(mfaCacheToken: string): void {
    return localStorage.setItem("mfa_cache_token", mfaCacheToken);
  }

  public saveMFAMaskedPhone(mfaMaskedPhone: string): void {
    return localStorage.setItem("mfa_masked_phone", mfaMaskedPhone);
  }

  /**
   * Return a single error message
   *
   * @param error - axios error
   */
  public prettyErrorMessage(error: AxiosError) {
    if (error.response) {
      let message = "";
      switch (error.response.status) {
        case 401:
          message = "Invalid or expired login token/password. Try again.";
          break;
        case 500:
          message =
            "There was a temporary problem on the Nimble service. Please check back later.";
          break;
        default:
          break;
      }
      // Request made and server responded
      return message;
    } else if (error.request) {
      // The request was made but no response was received
      return "Cannot connect to the Nimble Service. Please check your connection.";
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
}

export default new AuthService();
