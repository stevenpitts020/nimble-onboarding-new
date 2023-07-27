import React from "react";
import "./LoanApplication.sass";
import Logo from "../../assets/LogoSideBar.png";
import checkedGray from "../../assets/checkedGray.svg";
import Question from "../../assets/question.svg";
import { useHistory } from "react-router-dom";

import { Menu } from "antd";
import revolvingCard from "../../assets/revolvingCard.svg";
import termCard from "../../assets/termCard.svg";
import hybridCard from "../../assets/hybridCard.svg";
import Card from "../Common/Card/Card";
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
const LoanApplication: React.FunctionComponent = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const history = useHistory();
  const handleSelect = () => {
    history.push("/id-card");
  };
  return (
    <div className="LoanApplication">
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
        <div className="content-container-content">
          <div className="content-title">
            <div className="business">
              <span>What type of loan application?</span>
            </div>
            <div className="sub-title">
              <span>Please choose from the 3 various options below </span>
            </div>
          </div>
          <div className="content-card">
            <div className="card-item">
              <Card
                image={revolvingCard}
                title="Revolving"
                subTitle="Line of Credit features for the greatest flexibility of all."
                active={true}
                addSpin={true}
                handleSelect={handleSelect}
              />
            </div>
            <div className="card-item mr-20">
              <Card
                image={termCard}
                title="Term"
                subTitle="Fixed Amonut and Duration usually a longer term period."
                handleSelect={handleSelect}
              />
            </div>
            <div className="card-item">
              <Card
                image={hybridCard}
                title="Hybrid"
                subTitle="Best of both worlds. Example would be construction-to-perm"
                handleSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
