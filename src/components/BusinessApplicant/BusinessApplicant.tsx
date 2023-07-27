import React, { useState, useEffect } from "react";
import "./BusinessApplicant.sass";
import Logo from "../../assets/LogoSideBar.png";
import checkedGray from "../../assets/checkedGray.svg";
import Question from "../../assets/question.svg";
import Inf from "../../assets/inf.svg";
import ArrowRight from "../../assets/arrowRight.svg";
import { useHistory } from "react-router-dom";
import { Menu, Switch, Input } from "antd";
import * as yup from "yup";
import InputEIN from "../Forms/InputEIN/InputEIN";

function getItem(label, key, icon, children?) {
  return {
    key,
    icon,
    label,
    children,
  };
}
const items = [
  getItem("Authentication", "sub1", <img src={checkedGray} />),
  getItem("Qualification", "sub2", <img src={checkedGray} />),
  getItem("Agreement", "sub4", <img src={checkedGray} />),
];
const BusinessApplicant: React.FunctionComponent = () => {
  const history = useHistory();
  const [checked, setChecked] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [errorField, setErrorField] = useState({
    domain: false,
    legalBusinessName: false,
    doingBusinessAs: false,
    ein: false,
    einEIN: false,
    legalBusinessNameEIN: false,
    websiteDomain: false,
    entityType: false,
  });
  const [valueDomain, setValueDomain] = useState({
    domain: "",
    legalBusinessName: "",
    doingBusinessAs: "",
    ein: "",
  });
  const [valueEIN, setValueEIN] = useState({
    entityType: "",
    legalBusinessName: "",
    websiteDomain: "",
    ein: "",
  });
  const regex =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  const schemaDomain = yup
    .object()
    .shape({
      domain: yup.string().matches(regex, "Enter correct url!").required(),
      legalBusinessName: yup.string().required(),
      doingBusinessAs: yup.string().required(),
      ein: yup.string().required().length(9),
    })
    .required();
  const schemaEIN = yup
    .object()
    .shape({
      ein: yup.string().required().length(9),
      legalBusinessName: yup.string().required(),
      websiteDomain: yup
        .string()
        .matches(regex, "Enter correct url!")
        .required(),
      entityType: yup.string().required(),
    })
    .required();
  const onClick = (e) => {
    console.log("click ", e);
  };
  const onSubmit = async () => {
    history.push("/product-request");
  };
  const onChange = async (fields: string, value: string) => {
    if (checked) {
      setValueDomain({
        ...valueDomain,
        [fields]: value,
      });
    } else {
      setValueEIN({
        ...valueEIN,
        [fields]: value,
      });
    }
  };
  useEffect(() => {
    if (checked) {
      schemaDomain.isValid(valueDomain).then(async (valid) => {
        await setIsValid(valid);
      });
    } else {
      schemaEIN.isValid(valueEIN).then(async (valid) => {
        await setIsValid(valid);
      });
    }
  }, [valueDomain, valueEIN]);
  const onSwitch = () => {
    setChecked(!checked);
    if (!checked) {
      schemaDomain.isValid(valueDomain).then(function (valid) {
        setIsValid(valid);
      });
    } else {
      schemaEIN.isValid(valueEIN).then(function (valid) {
        setIsValid(valid);
      });
    }
  };
  return (
    <div data-testid="BusinessApplication" className="BusinessApplication">
      <div className="sideBar">
        <div className="logo">
          <img src={Logo} />
        </div>
        <div className="menu">
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["sub1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className="faq">
          <div className="faq_header">
            <div className="question_mark">
              <img src={Question} />
            </div>
            <span>FAQs</span>
          </div>
          <div className="faq_content">
            <div className="title">
              <div className="title_question">
                Can the bank require me to provide my Social Security number?
              </div>
              <div className="title_answer">
                Yes, in certain circumstances. A bank may be required to obtain
                an identification number for several kinds of banking-related
                activities...
              </div>
              <div className="title_answer expand">Read more</div>
            </div>
            <div className="title">
              <div className="title_question">
                Social Security Card or Individual Taxpayer Identification
                Number
              </div>
              <div className="title_answer">
                Banks also require you to have either a valid Social Security
                number...
              </div>
              <div className="title_answer expand">Read more</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="content-container-form">
          <form className="content">
            <div className="title">
              <div className="business">
                <span>Business</span>
              </div>
              <div className="sub-title">
                <span>what business are you applying on behalf of</span>
              </div>

              <div className="switch">
                <p>EIN</p>
                <Switch defaultChecked={checked} onChange={onSwitch} />
                <p>Domain</p>
              </div>
            </div>
            <div className="content-input">
              <div className="input-container">
                <span className="title">{checked ? "Domain" : "EIN #"}</span>
                {checked ? (
                  <div className="position">
                    <Input
                      placeholder="https://www.website-provided.com"
                      onChange={(e) => onChange("domain", e.target.value)}
                      name="domain"
                      value={valueDomain.domain}
                      className={errorField.domain ? "border-error" : ""}
                      onBlur={() => {
                        if (!regex.test(valueDomain.domain)) {
                          setErrorField({ ...errorField, domain: true });
                        } else setErrorField({ ...errorField, domain: false });
                      }}
                    />
                    <img src={Inf} className="input-icon" />
                    {errorField.domain && (
                      <p className="error-message">Invalid domain</p>
                    )}
                  </div>
                ) : (
                  <div className="position">
                    <InputEIN
                      name="ein"
                      className={`relative custom-input ${
                        errorField.einEIN ? "border-error" : ""
                      }`}
                      placeholder="00-0000000"
                      onChange={(value) => onChange("ein", String(value))}
                      value={valueEIN.ein}
                      onBlur={() => {
                        if (valueEIN.ein === "" || valueEIN.ein.length < 9) {
                          setErrorField({ ...errorField, einEIN: true });
                        } else setErrorField({ ...errorField, einEIN: false });
                      }}
                    />
                    <img src={Inf} className="input-icon" />
                    {errorField.einEIN && (
                      <p className="error-message">Invalid EIN</p>
                    )}
                  </div>
                )}
              </div>
              <div className="input-container">
                <span className="title">Legal Business Name</span>
                <div className="position">
                  <Input
                    placeholder="Enter legal business name"
                    name="legalBusinessName"
                    className={
                      checked
                        ? errorField.legalBusinessName
                          ? "border-error"
                          : ""
                        : errorField.legalBusinessNameEIN
                        ? "border-error"
                        : ""
                    }
                    onChange={(e) =>
                      onChange("legalBusinessName", e.target.value)
                    }
                    value={
                      checked
                        ? valueDomain.legalBusinessName
                        : valueEIN.legalBusinessName
                    }
                    onBlur={() => {
                      if (checked) {
                        if (valueDomain.legalBusinessName === "") {
                          setErrorField({
                            ...errorField,
                            legalBusinessName: true,
                          });
                        } else
                          setErrorField({
                            ...errorField,
                            legalBusinessName: false,
                          });
                      } else {
                        if (valueEIN.legalBusinessName === "") {
                          setErrorField({
                            ...errorField,
                            legalBusinessNameEIN: true,
                          });
                        } else
                          setErrorField({
                            ...errorField,
                            legalBusinessNameEIN: false,
                          });
                      }
                    }}
                  />
                  <img src={Inf} className="input-icon" />
                  {((checked && errorField.legalBusinessName) ||
                    (!checked && errorField.legalBusinessNameEIN)) && (
                    <p className="error-message">Required!</p>
                  )}
                </div>
              </div>
              <div className="input-container">
                <span className="title">
                  {checked ? "Doing Business As" : "Website Domain"}
                </span>
                <div className="position">
                  <Input
                    placeholder={
                      checked
                        ? "Common Business Name"
                        : "https://www.relateddomain.com"
                    }
                    name={checked ? "doingBusinessAs" : "websiteDomain"}
                    onChange={(e) => {
                      if (checked) {
                        onChange("doingBusinessAs", e.target.value);
                      } else onChange("websiteDomain", e.target.value);
                    }}
                    className={
                      checked
                        ? errorField.doingBusinessAs
                          ? "border-error"
                          : ""
                        : errorField.websiteDomain
                        ? "border-error"
                        : ""
                    }
                    value={
                      checked
                        ? valueDomain.doingBusinessAs
                        : valueEIN.websiteDomain
                    }
                    onBlur={() => {
                      if (checked) {
                        if (valueDomain.doingBusinessAs === "") {
                          setErrorField({
                            ...errorField,
                            doingBusinessAs: true,
                          });
                        } else
                          setErrorField({
                            ...errorField,
                            doingBusinessAs: false,
                          });
                      } else {
                        if (!regex.test(valueEIN.websiteDomain)) {
                          setErrorField({
                            ...errorField,
                            websiteDomain: true,
                          });
                        } else
                          setErrorField({
                            ...errorField,
                            websiteDomain: false,
                          });
                      }
                    }}
                  />
                  <img src={Inf} className="input-icon" />
                  {((checked && errorField.doingBusinessAs) ||
                    (!checked && errorField.websiteDomain)) && (
                    <p className="error-message">
                      {checked
                        ? errorField.doingBusinessAs && "Required!"
                        : errorField.websiteDomain && "Invalid Domain"}
                    </p>
                  )}
                </div>
              </div>
              <div className="input-container">
                <span className="title">
                  {checked ? "EIN #" : "Entity Type"}
                </span>
                {checked ? (
                  <div className="position">
                    <InputEIN
                      name="EIN#"
                      className={`relative custom-input ${
                        errorField.ein ? "border-error" : ""
                      }`}
                      placeholder="00-0000000"
                      onChange={(value) => onChange("ein", String(value))}
                      value={valueDomain.ein}
                      onBlur={() => {
                        if (
                          valueDomain.ein === "" ||
                          valueDomain.ein.length < 9
                        ) {
                          setErrorField({ ...errorField, ein: true });
                        } else setErrorField({ ...errorField, ein: false });
                      }}
                    />
                    <img src={Inf} className="input-icon" />
                    {errorField.ein && (
                      <p className="error-message">Invalid EIN</p>
                    )}
                  </div>
                ) : (
                  <div className="position">
                    <Input
                      placeholder="LLC"
                      name="entityType"
                      onChange={(e) => onChange("entityType", e.target.value)}
                      value={valueEIN.entityType}
                      className={errorField.entityType ? "border-error" : ""}
                      onBlur={() => {
                        if (valueEIN.entityType === "") {
                          setErrorField({ ...errorField, entityType: true });
                        } else
                          setErrorField({ ...errorField, entityType: false });
                      }}
                    />
                    <img src={Inf} className="input-icon" />
                    {errorField.entityType && (
                      <p className="error-message">Required!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="back-container">
          <button
            className="back-container-content"
            onClick={onSubmit}
            disabled={!isValid}
          >
            Next
            <img src={ArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessApplicant;
