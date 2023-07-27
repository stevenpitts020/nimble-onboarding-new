import React, { ChangeEvent, useEffect } from "react";
import "./RequiredContact.sass";
import logo from "../../assets/Logo.png";
import emailIcon from "../../assets/Email.svg";
import bgImage from "../../assets/theme.png";
import infIcon from "../../assets/inf.svg";
import infErrorIcon from "../../assets/InfError.svg";
import checkedIcon from "../../assets/checkedIcon.svg";
import { Switch } from "antd";
import { useHistory } from "react-router-dom";
import { authService } from "../../services";

const RequiredContact: React.FC<any> = (props) => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showError, setShowError] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    const token = authService.getAccessToken();
    Promise.all([
      authService.getMe(token),
      authService.getAccountRequest(token),
    ])
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  async function verify() {
    setLoading(true);
    history.push("/business-applicant");
  }

  async function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    validateEmail();
    if (!isValid) {
      return;
    }

    if (event.key !== "Enter") {
      return;
    }
    verify();
  }
  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const email = e.target.value;
    setEmail(email);
  }
  function validateEmail(): void {
    /* eslint-disable no-useless-escape */
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      setShowError("Email is not valid");
      setIsValid(false);
    } else {
      setShowError("");
      setIsValid(true);
    }
  }
  return (
    <div
      data-testid="RequiredContact"
      className={`ni-step-authentication ${props.className}`}
      style={props.style}
    >
      <div className="ni-institution-general">
        <div className="ni-list-general-data">
          <img className="ni-input-general-data-bg" src={bgImage}></img>
          <img className="ni-institution-logo" alt="Placeholder" src={logo} />
          <h1>Required Contact Info</h1>
        </div>
        <div className="ni-input-general">
          <div className="ni-input-container">
            <h3>Required Contact Info</h3>
            <p>
              Federal regulation requires that we obtain a valid email address
              that is addressed to you..
            </p>
            <div className="title-container">
              <p>Email</p>
              {isValid && (
                <div className="switch">
                  <p>Business</p>
                  <Switch
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <p>Individual</p>
                </div>
              )}
            </div>
            <div className={`input-email ${showError && "error"} `}>
              <div className="first-input-part">
                <img src={emailIcon} className="input-email-icon" />
                <input
                  value={email}
                  onChange={onChange}
                  disabled={loading}
                  onKeyDown={onKeyDown}
                  placeholder="username@contact.com"
                  onBlur={validateEmail}
                  autoFocus
                />
              </div>
              {isValid ? (
                <img src={checkedIcon} className="input-email-icon" />
              ) : showError ? (
                <img src={infErrorIcon} className="input-email-icon" />
              ) : (
                <img src={infIcon} className="input-email-icon" />
              )}
            </div>
            {showError && <p className="error-message">{showError}</p>}
            <label className="ni-checkbox-container">
              <label htmlFor="checkbox">
                Please provide professional email if applying for business
                product.
              </label>
            </label>
            <button onClick={verify} disabled={!isValid}>
              {isValid
                ? checked
                  ? "Applying as a Individual"
                  : "Applying as a Business"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredContact;
