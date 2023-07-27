import React from "react";
import { useHistory } from "react-router-dom";
import "./Login.sass";
// import { InstitutionContext } from "../../../store/InstitutionContext";
import logo from "../../assets/Logo.png";
import { ReactComponent as Phone } from "../../assets/Phone.svg";
import bgImage from "../../assets/theme.png";
import { authService } from "../../services";
import { AuthContextStore } from "../../store/AuthContext";
import { IStepInstructions } from "./types";
import FakePlaceholder from "../Steps/NewStepInstructions/components/FakePlaceholder";
import Input from "../Forms/NewInput/Input";
import NumberFormat from "react-number-format";
import clsx from "clsx";
import * as yup from "yup";
import "yup-phone";

const defaultProps = {
  title: "Open your account in as little as 90 seconds",
};

const LoginPage: React.FC<IStepInstructions> = (props) => {
  const history = useHistory();
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const { setAuthToken } = React.useContext(AuthContextStore);
  const phoneSchema = yup.string().phone("US", true).required();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onContinue = () => {
    console.log("continue");

    history.push("/verify-code");
  };

  async function saveNumber() {
    setLoading(true);
    await authService
      .authToken({
        id: phone,
        role: "applicant",
        method: "verify-code",
      })
      .then((response) => {
        setLoading(false);
        setAuthToken(phone, response.verification_token);
        setError("");
        onContinue();
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data?.message);
      });
  }

  // const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (!isValid) {
  //     return;
  //   }

  //   if (e.key !== "Enter") {
  //     return;
  //   }
  //   await saveNumber();
  // };

  const onChange = async (e: string | number) => {
    setPhone(String(e));
    setIsValid(await phoneSchema.isValid(String(e)));
  };

  return (
    <div
      data-testid="StepInstructions"
      className={`ni-step-instructions ${props.className}`}
      style={props.style}
    >
      <div className="ni-institution-general">
        <div className="ni-list-general-data">
          <img className="ni-list-general-data-bg" src={bgImage} />
          <img className="ni-institution-logo" alt="Placeholder" src={logo} />
          <h1>60x Faster Onboarding</h1>
        </div>
        <div className="ni-input-general">
          <div className="ni-input-container">
            {error && <div className="error-message">{error}</div>}
            <h3>Get Started</h3>
            <p className="detail">
              Central Bank aims to deliver premiere experience for our customers
              and prospects, please start by providing your cell phone number
              below.
            </p>
            <div>
              <div className="input-phone-number">
                <div className="label-phone">Phone Number</div>
                {phone !== "" && !isValid && (
                  <div className="error-message">
                    Please make sure that you enter the correct phone number
                  </div>
                )}
                <Input
                  name="Phone number"
                  label="Phone Number"
                  renderIcon={({ color }) => <Phone fill={color} />}
                  isFromCache
                  renderInput={({
                    ref,
                    onChange,
                    value,
                    className,
                    placeholder,
                    ...inputProps
                  }) => (
                    <div className="relative flex flex-1 flex-col pd-1">
                      <NumberFormat
                        {...inputProps}
                        className={clsx(
                          className,
                          "text-transparent caret-black"
                        )}
                        value={phone}
                        onValueChange={({ value }) => {
                          onChange?.(value);
                        }}
                        format="(###) ###-####"
                        mask="_"
                        getInputRef={(elm) => (ref.current = elm)}
                      />
                      {value === "" && (
                        <FakePlaceholder
                          placeholder={placeholder}
                          value={value}
                        />
                      )}
                    </div>
                  )}
                  tooltip="By providing your phone number you agree that it may be used to authenticate your account."
                  example="(123) 456-7890"
                  placeholder="(000) 000-0000"
                  autoFocus
                  value={phone}
                  onChange={(value) => onChange(value)}
                  error={phone !== "" && !isValid}
                />
              </div>
            </div>
            <label className="ni-checkbox-container">
              <label htmlFor="checkbox">
                By clicking “<strong>Get Started</strong>” (below), I provide my
                consent to{" "}
                <u
                  onClick={() =>
                    history.push("/onboarding/terms-and-conditions")
                  }
                >
                  terms & conditions
                </u>
                ,{" "}
                <u
                  onClick={() =>
                    history.push("/onboarding/terms-and-conditions")
                  }
                >
                  e-communication
                </u>
                ,{" "}
                <u
                  onClick={() =>
                    history.push("/onboarding/terms-and-conditions")
                  }
                >
                  privacy notices
                </u>
                , and{" "}
                <u
                  onClick={() =>
                    history.push("/onboarding/terms-and-conditions")
                  }
                >
                  other disclosures
                </u>
                .
              </label>
            </label>
            <button onClick={saveNumber} disabled={!isValid}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.defaultProps = defaultProps;
export default LoginPage;
