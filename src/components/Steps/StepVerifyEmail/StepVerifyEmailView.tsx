import React from "react";
import { AlertCircle } from "react-feather";
import { IStepView } from "./types";
import { Layout } from "../../NewLayout/Layout";
import { ReactComponent as Email } from "./email.svg";
import { ReactComponent as Logo } from "./email-logo.svg";

const StepVerifyEmailView = ({ error, signerData, emailHost }: IStepView) => (
  <Layout
    dataTestId="StepVerifyEmail"
    classNameContainer="flex flex-1 justify-center items-center"
    isBankHeader
    hideFooter
  >
    <div className="w-fit mx-auto text-center mb-16 pb-10 rounded-2xl bg-white">
      <Email className="mx-auto mt-12 mb-11" />

      <h1 className="font-inter text-2xl text-neutral100 font-bold w-fit mx-auto">
        Please check your email!
      </h1>

      <p className="mt-1 text-sm text-neutral60 font-inter mx-36">
        We have sent you an email to{" "}
        <span className="text-neutral100 font-bold">{signerData.email}</span>,
        please <br />
        check your email for next steps!
      </p>
      {error && (
        <div role="alert" className="alert toast is-error" data-testid="error">
          <AlertCircle /> Sorry, there was a problem sending the email. Please
          try again later.
        </div>
      )}

      <a
        href={`https://${emailHost}`}
        className="bg-blueCrayola rounded-lg text-white px-14 py-2 flex justify-center items-center w-fit mx-auto mt-4"
        target="_blank"
        rel="noreferrer"
      >
        <Logo className="mr-2" />
        Go to Email
      </a>
    </div>
  </Layout>
);

export default StepVerifyEmailView;
