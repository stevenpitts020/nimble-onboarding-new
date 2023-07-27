import React, { useReducer, useState } from "react";
import * as Sentry from "@sentry/react";
// import FormatHelper from "../utils/FormatHelper";
import { authService, log } from "../services";
// import _ from "lodash";
// import { AxiosError } from "axios";
/* Use a Service to abstract some logic */

interface IStateMachine {
  status: string;
  error?: string | null;
}

export interface IAuthState extends IStateMachine {
  token?: string | null;
}

/* Initial state for reducer */
const initialState = {
  status: "idle",
};

/* define action types */
interface IAction {
  type: "fetch" | "logout" | "login_success" | "login_fail";
}

interface IRejectAction extends IAction {
  payload: string;
}

interface IResolveAction extends IAction {
  token: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  createdAt: string;
  lastLoginAt?: string;
  roles: string[];
  status: string;
  phone?: string;
}

/* Types for the Context and Provider */
type IReducer = (
  prevState: IAuthState,
  action: IAction | IRejectAction | IResolveAction
) => IAuthState;

/* Reducer */
const reducer = (prevState: IAuthState, action: IAction) => {
  switch (action.type) {
    case "fetch":
      return {
        ...prevState,
        status: "loading",
      };
    case "login_success":
      return {
        ...prevState,
        status: "success",
        token: (action as IResolveAction).token,
        error: undefined,
      };
    case "login_fail":
      return {
        ...prevState,
        status: "failure",
        error: (action as IRejectAction).payload,
        token: undefined,
      };
    case "logout":
      return {
        ...prevState,
        status: "idle",
        error: (action as IRejectAction).payload,
        token: undefined,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/* We need to specify Type for new Context Store */
interface IAuthContextInterface {
  auth: IAuthState;
  dispatchAuth: (action: IAction | IRejectAction | IResolveAction) => void;
  // handleLogin: (verificationCode: string) => void;
  handleLogout: (message?: string) => void;
  hasPhone: (user?: IUser | undefined) => boolean;
  setAuthToken: (phone: string, verification_token) => void;
  setTokenReceived: (token: string) => void;
  phone: string;
  verification_token: string;
  token: string;
}
/* Export this because we"re going to be using it alot */
export const AuthContextStore = React.createContext(
  {} as IAuthContextInterface
);

interface IProvider {
  children: React.ReactNode;
  existingToken?: string | null;
}

/* Create our global store provider */
const AuthProvider = (props: IProvider) => {
  /*
    State Auth Reducer
  */
  const [auth, dispatchAuth] = useReducer<IReducer>(reducer, {
    ...initialState,
    token: props.existingToken,
  });
  const [phone, setPhone] = useState("");
  const [verification_token, setVerification_token] = useState("");
  const [token, setToken] = useState("");
  /*
   * Login to the api
   * @param credentials - email and password
   */
  // const handleLogin = async (verificationCode: string) => {
  //   try {
  //     dispatchAuth({ type: "fetch" });
  //     await authService
  //       .verifyCode(phone, verificationCode)
  //       .then((response) => {
  //         // set user in Sentry scope
  //         Sentry.setUser({ phone: phone });

  //         authService.saveAccessToken(response.data.token);
  //         dispatchAuth({
  //           type: "login_success",
  //           token: response.data.token,
  //         });
  //       })
  //       .catch((err) => console.log(err, "handleLogin"));
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       log.error(error, "handleLogin");
  //       dispatchAuth({
  //         type: "login_fail",
  //         payload: authService.prettyErrorMessage(error),
  //       });
  //     }
  //   }
  // };
  const setTokenReceived = (token) => {
    setToken(token);
  };
  const setAuthToken = (phone, verification_token) => {
    console.log("===============", phone, verification_token);
    setPhone(phone);
    setVerification_token(verification_token);
  };
  /**
   * Logs the user out of the app. Can receive a message to present on the Login Screen
   * IE: ErrorBoundary
   *
   * @param message - string
   */
  const handleLogout = (message?: string) => {
    Sentry.configureScope((scope) => scope.setUser(null));

    log.info("logout success", "handleLogout");
    authService.removeAccessToken();
    dispatchAuth({ type: "logout", payload: message });
  };

  /**
   * Returns true or false if the user is authenticated
   */
  const hasPhone = (user: IUser | undefined): boolean => {
    if (!user) {
      return true;
    }

    return !!user.phone;
  };

  return (
    <AuthContextStore.Provider
      value={{
        auth,
        dispatchAuth,
        // handleLogin,
        handleLogout,
        hasPhone,
        setAuthToken,
        phone,
        token,
        verification_token,
        setTokenReceived,
      }}
    >
      {props.children}
    </AuthContextStore.Provider>
  );
};

export default AuthProvider;
