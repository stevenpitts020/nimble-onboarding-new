import React, { useState } from "react";
import DepositSubProductsView from "./DepositSubProductsView";
import { useHistory, useLocation } from "react-router-dom";
import { SIDEBAR_TYPE, Layout } from "../../NewLayout/Layout";

const DepositSubProducts = () => {
  const history = useHistory();
  const { state } = useLocation();
  const [isActive, setIsActive] = useState(state?.active || "Checking");

  const goToNext = () => {
    if (sessionStorage.getItem("AccountType") === "Business") {
      history.push("/onboarding/business-ein");
    } else {
      history.push("/onboarding/capture-documents");
    }
  };

  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      classNameContainer={"m-auto"}
      hideHeader
      showTimer={false}
      onClickNext={goToNext}
    >
      <div className="mainContainer_wrapper">
        <div className="mainContainer">
          <div className="flex flex-col">
            <DepositSubProductsView
              isActive={isActive}
              setIsActive={setIsActive}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DepositSubProducts;
