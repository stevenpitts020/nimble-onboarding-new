import React, { ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./VerifyCode.sass";
import logo from "../../assets/Logo.png";
import { authService } from "../../services";
import InfoIcon from "../../assets/inf.svg";
import bgImage from "../../assets/theme.png";
import { AuthContextStore } from "../../store/AuthContext";
import { Modal } from "antd";

const VerifyCode: React.FC<any> = (props) => {
  const history = useHistory();
  const [code, setCode] = React.useState("");
  const [codeFormat, setCodeFormat] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [checked, setChecked] = React.useState("radio-1");
  const { phone, verification_token, setTokenReceived, setAuthToken } =
    React.useContext(AuthContextStore);
  const [showError, setShowError] = React.useState("");
  useEffect(() => {
    if (isValid) {
      verify();
    }
  }, [isValid]);
  async function verify() {
    if (!isValid) {
      return;
    }
    await authService
      .authToken({
        id: phone,
        role: "applicant",
        method: "token-exchange",
        verification_token: verification_token,
        verification_code: codeFormat,
      })
      .then((response) => {
        setTokenReceived(response.access_token);
        authService.saveAccessToken(response.access_token);
        setShowError("");
        history.push("/required-contact");
      })
      .catch((error) => {
        setShowError(error.response.data.message);
      });
  }
  async function resendCode() {
    await authService
      .authToken({
        id: phone,
        role: "applicant",
        method: "verify-code",
        callback: "sms",
      })
      .then((response) => {
        setAuthToken(phone, response.verification_token);
      })
      .catch((error) => {
        setShowError(error.response.data.message);
      });
  }
  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setCode(e.target.value);
    const input = e.target.value.replace(/\D/g, "").substring(0, 6);
    const first = input.substring(0, 3);
    const second = input.substring(3, 6);
    if (input.length > 3) {
      setCode(`${first}-${second}`);
    } else if (input.length >= 0) {
      setCode(input);
    }
    setIsValid(input.length === 6);
    setCodeFormat(input);
  }
  const onChangeOption = (e) => {
    setChecked(e.target.value);
  };
  const handleContinue = () => {
    if (checked === "radio-1") {
      setIsModalOpen(false);
      resendCode();
    } else {
      history.push("/login");
    }
  };
  return (
    <div
      data-testid="VerifyCode"
      className={`ni-step-authentication ${props.className}`}
      style={props.style}
    >
      <div className="ni-institution-general">
        <div className="ni-list-general-data">
          <img className="ni-input-general-data-bg" src={bgImage}></img>
          <img className="ni-institution-logo" alt="Placeholder" src={logo} />
          <h1>Authentication</h1>
        </div>
        <div className="ni-input-general">
          <div className="ni-input-container">
            <h3>Authentication</h3>
            <p>
              Please verify the 6 -digit authentication code that we have sent a
              text message to your phone number.
            </p>
            <div className="code-input-container">
              <label>Code</label>
              <span className="code-input">
                <input
                  type="string"
                  maxLength={7}
                  value={code}
                  onChange={onChange}
                  placeholder=" _ _ _ - _ _ _ "
                  autoFocus
                />
                <img src={InfoIcon} className="in-icon" />
              </span>
            </div>
            {showError && <div className="error-code-message">{showError}</div>}
            <button onClick={() => setIsModalOpen(true)}>Help</button>
          </div>
        </div>
        <Modal
          title="Help"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          className="modal"
        >
          <div>
            <div className="flex items-center pl-4 rounded border-gray-200 dark:border-gray-700 border-bottom">
              <input
                id="bordered-radio-1"
                type="radio"
                value="radio-1"
                name="bordered-radio"
                className={`${
                  checked === "radio-1" ? "checked" : ""
                } w-4 h-4 text-blue-600`}
                checked={checked === "radio-1"}
                onChange={onChangeOption}
              />
              <label
                htmlFor="bordered-radio-1"
                className="py-6 ml-2 w-full text-sm checkbox-label"
              >
                I did not receive the 6-digit authentication code. Send another
                code.
              </label>
            </div>
            <div className="flex items-center pl-4 rounded border-gray-200 dark:border-gray-700 border-bottom">
              <input
                id="bordered-radio-2"
                type="radio"
                value="radio-2"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 "
                checked={checked === "radio-2"}
                onChange={onChangeOption}
              />
              <label
                htmlFor="bordered-radio-2"
                className="py-6 ml-2 w-full text-sm checkbox-label"
              >
                I don&apos;t have the number. I want to use a different number.
              </label>
            </div>
            <div className="continue-button">
              <button onClick={handleContinue}>Continue</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VerifyCode;
