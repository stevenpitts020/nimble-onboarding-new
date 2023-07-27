import React, { useState } from "react";
import "./Verification.sass";
import Logo from "../../assets/LogoSideBar.png";
import checkedGray from "../../assets/checkedGray.svg";
import checkedGreen from "../../assets/checkedGreen.svg";
import Empty from "../../assets/Empty.svg";
import Question from "../../assets/question.svg";
import ArrowLeft from "../../assets/arrowLeft.svg";
import driveCard from "../../assets/driveCard.svg";
import stateCard from "../../assets/stateCard.svg";
import legalCard from "../../assets/legalCard.svg";
import passportCard from "../../assets/passportCard.svg";
import { useHistory } from "react-router-dom";

import { Menu } from "antd";
import VerificationCard from "./VerificationCard/VerificationCard";
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
const Verification: React.FunctionComponent = () => {
  const [option, setOption] = useState();
  const history = useHistory();
  const onClick = (e) => {
    console.log("click ", e);
  };
  const handleSelectID = (option) => {
    setOption(option);
  };
  return (
    <div className="Verification">
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
      <div className="verify-container">
        <div className="content-container-content">
          <div>
            <div className="content-title">
              <div className="title1">We need to verify your identity</div>
              <div className="title2">
                Which ID do you wish to use to verify your identity?
              </div>
              <div className="title3">
                Make sure that your document is readable and is not physically
                damaged or expired
              </div>
            </div>
            <div className="verify-card">
              <VerificationCard
                image={driveCard}
                active={true}
                title="Driver license"
              />
              <VerificationCard
                image={stateCard}
                active={false}
                title="State-Issued ID"
              />
            </div>
            <div className="verify-card">
              <VerificationCard
                image={legalCard}
                active={false}
                title="Legal Residency Card (VISA)"
              />
              <VerificationCard
                image={passportCard}
                active={false}
                title="Passport"
              />
            </div>
            <div className="mr84">
              <div className="title-required">
                <p>Required ID Verification</p>
              </div>
              <div className="title4">In accordance with 31 CFR § 1020.220</div>
            </div>
          </div>
        </div>
        <div className="back-container">
          <button
            className="back-container-content"
            onClick={() => history.goBack()}
          >
            <img src={ArrowLeft} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
