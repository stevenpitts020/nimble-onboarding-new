import React from "react";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { Route, Switch } from "react-router-dom";
import ConfirmEmail from "./ConfirmEmail";
import renderWithReactRouter from "../../support/router/renderWithReactRouter";

const app = () => (
  <div>
    <Switch>
      <Route path="/email-verification/:signerId/:verificationId">
        <ConfirmEmail />
      </Route>
    </Switch>
  </div>
);

describe("ConfirmEmail", () => {
  test("should render link expired", async () => {
    renderWithReactRouter(app(), {
      route:
        "/email-verification/409/5165a1a7-1539-4c31-9ae9-ff2eadb77b8f?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz" +
        "UxMiJ9.eyJ1c2VySWQiOm51bGwsInNjb3BlcyI6WyJzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIl0sInJlc291cmNlcyI6Wy" +
        "JzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIzUxNjVhMWE3LTE1MzktNGMzMS05YWU5LWZmMmVhZGI3N2I4ZiJdLCJpc3MiOiJ" +
        "odHRwOi8vbG9jYWxob3N0OjgwODAiLCJzdWIiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvdjEvdXNlcnMvbnVsbCIsImF1ZCI6" +
        "Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImV4cCI6MTYxMjk3NzM3MCwiaWF0IjoxNjEyODkwOTcwfQ.T86Q0fNh9PcCkOvHrU" +
        "irLOkPGBWfMIsl_h4cFHHLne0uMlWEUeW7GdIWiIJx-fLdSORYYA1a0wV15ZFR-SYmeQ",
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Your email confirmation link expired!/)
      ).toBeInTheDocument();
    });
  });

  test("should render confirm email success", async () => {
    renderWithReactRouter(app(), {
      route:
        "/email-verification/200/5165a1a7-1539-4c31-9ae9-ff2eadb77b8f?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz" +
        "UxMiJ9.eyJ1c2VySWQiOm51bGwsInNjb3BlcyI6WyJzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIl0sInJlc291cmNlcyI6Wy" +
        "JzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIzUxNjVhMWE3LTE1MzktNGMzMS05YWU5LWZmMmVhZGI3N2I4ZiJdLCJpc3MiOiJ" +
        "odHRwOi8vbG9jYWxob3N0OjgwODAiLCJzdWIiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvdjEvdXNlcnMvbnVsbCIsImF1ZCI6" +
        "Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImV4cCI6MTYxMjk3NzM3MCwiaWF0IjoxNjEyODkwOTcwfQ.T86Q0fNh9PcCkOvHrU" +
        "irLOkPGBWfMIsl_h4cFHHLne0uMlWEUeW7GdIWiIJx-fLdSORYYA1a0wV15ZFR-SYmeQ",
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Your email account was successfully verified./)
      ).toBeInTheDocument();
    });
  });

  test("should render link is broken", async () => {
    renderWithReactRouter(app(), {
      route:
        "/email-verification/404/5165a1a7-1539-4c31-9ae9-ff2eadb77b8f?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz" +
        "UxMiJ9.eyJ1c2VySWQiOm51bGwsInNjb3BlcyI6WyJzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIl0sInJlc291cmNlcyI6Wy" +
        "JzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIzUxNjVhMWE3LTE1MzktNGMzMS05YWU5LWZmMmVhZGI3N2I4ZiJdLCJpc3MiOiJ" +
        "odHRwOi8vbG9jYWxob3N0OjgwODAiLCJzdWIiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvdjEvdXNlcnMvbnVsbCIsImF1ZCI6" +
        "Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImV4cCI6MTYxMjk3NzM3MCwiaWF0IjoxNjEyODkwOTcwfQ.T86Q0fNh9PcCkOvHrU" +
        "irLOkPGBWfMIsl_h4cFHHLne0uMlWEUeW7GdIWiIJx-fLdSORYYA1a0wV15ZFR-SYmeQ",
    });
    await waitFor(() => {
      const element = screen.getByText(
        /Your email confirmation link didn't work!/
      );
      expect(element).toBeInTheDocument();
    });
  });
  test("when clicking on the Resend Email button it should show sent email message", async () => {
    renderWithReactRouter(app(), {
      route:
        "/email-verification/404/5165a1a7-1539-4c31-9ae9-ff2eadb77b8f?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzU" +
        "xMiJ9.eyJ1c2VySWQiOm51bGwsInNjb3BlcyI6WyJzaWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIl0sInJlc291cmNlcyI6WyJz" +
        "aWduZXJfZW1haWxfdmVyaWZpY2F0aW9uIzUxNjVhMWE3LTE1MzktNGMzMS05YWU5LWZmMmVhZGI3N2I4ZiJdLCJpc3MiOiJodH" +
        "RwOi8vbG9jYWxob3N0OjgwODAiLCJzdWIiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvdjEvdXNlcnMvbnVsbCIsImF1ZCI6Imh0" +
        "dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImV4cCI6MTYxMjk3NzM3MCwiaWF0IjoxNjEyODkwOTcwfQ.T86Q0fNh9PcCkOvHrUirLOk" +
        "PGBWfMIsl_h4cFHHLne0uMlWEUeW7GdIWiIJx-fLdSORYYA1a0wV15ZFR-SYmeQ",
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("resendButton"));
    });
    await waitFor(() => {
      expect(screen.getByTestId("resendButton").textContent).toBe("Sent!");
    });
  });
});
