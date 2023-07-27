import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputCode from "./InputCode";
import messageIcon from "./chat.svg";

const StepVerifyNumberView = () => {
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [code, setCode] = useState<string | null>(null);

  const nextPage = () => {
    setTimeout(() => history.push("/onboarding/introduction"), 1000);
  };

  const [loading, setLoading] = useState(false);
  return (
    <div className="ni-step-verify-number">
      <div className={"text-center mt-12 mb-[61px]"}>
        <img src={messageIcon} alt="" className="mx-auto" />
        <h3 className="text-gray font-inter text-base font-normal font-inter-400 mt-2">
          We just sent you a verification code to your cell phone.
        </h3>
      </div>
      <form className="grid grid-col-6 grid-flow-col gap-6" onSubmit={nextPage}>
        <InputCode
          length={6}
          loading={loading}
          onComplete={(value: string) => {
            setCode(value);
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
            setTimeout(() => history.push("/onboarding/introduction"), 1000);
          }}
        />
      </form>
      <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-20">
        <h5 className="text-base text-center mx-auto leading-5">
          <span className="text-gray font-inter">Didn’t recieve a code? </span>
          <span className="text-lighterGreen font-inter font-semibold">
            Resend
          </span>
        </h5>
      </div>
    </div>
  );
};

export default StepVerifyNumberView;
