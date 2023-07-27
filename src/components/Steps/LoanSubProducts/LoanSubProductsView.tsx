import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import lockClosedSVG from "./components/lockClosed.svg";
import lockOpenSVG from "./components/lockOpen.svg";
import outlineInfoSVG from "./components/outlineInfo.svg";
import lineOfCreditSVG from "./components/lineOfCredits.svg";
import lineOfCreditWhiteSVG from "./components/lineOfCreditsWhite.svg";
import termsLoanSVG from "./components/termsLoan.svg";
import termsLoanWhiteSVG from "./components/termsLoanWhite.svg";
import FlipCardLoan from "./components/FlipCardLoan";
import ReactSwitch from "react-switch";
import { IAccountOrProductsView } from "./types";
const LoanSubProductsView = ({ onClick }: IAccountOrProductsView) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={"pb-[36px]"}>
      <h1 className="font-bold text-24/36 text-neutral100 text-center group-hover:text-white">
        What are you applying for?
      </h1>
      <div className="my-5 flex justify-center">
        <img src={lockOpenSVG} alt={lockOpenSVG} className="-mt-2" />
        <p className="ml-2 text-neutral60 font-medium font-inter">Unsecured</p>
        <div className="px-5">
          <ReactSwitch
            checked={toggle}
            onChange={() => {
              setToggle(!toggle);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            offColor={"#111729"}
            onColor={"#4B7DF2"}
            width={40}
            height={24}
            handleDiameter={17}
          />
        </div>
        <img src={lockClosedSVG} alt={lockClosedSVG} className="-mt-2" />
        <p className="ml-2 text-neutral60 font-medium font-inter">Secured</p>
        <Tippy placement="right" content={"secured"}>
          <img
            src={outlineInfoSVG}
            alt={outlineInfoSVG}
            className="ml-1 -mt-2"
          />
        </Tippy>
      </div>
      <div className="container grid grid-cols-3 grid-rows-1 gap-5">
        <FlipCardLoan
          onClick={onClick}
          image={lineOfCreditSVG}
          imageBack={lineOfCreditWhiteSVG}
          title={"Line of Credit"}
          subtitle={
            "Lines of Credit are revoling credit lines that can be used repeatedly for everyday purchases or emergencies in either the full  limit amount or in smaller increments."
          }
          subtitleSecond={
            "Ex: operations, funding recievables or inventory, repairs & maintenance, purchases, emergencies... Read more"
          }
        />{" "}
        <FlipCardLoan
          onClick={onClick}
          image={termsLoanSVG}
          imageBack={termsLoanWhiteSVG}
          title={"Term Loan"}
          subtitle={
            "Term Loans are non-revolving, one-time lump sums of credit that a borrower normally uses for a specific purpose."
          }
          subtitleSecond={
            "Ex: acquiring an asset, buying a competing business, refinancing term debt, spreading out upfront operational costs, etc."
          }
        />{" "}
        <FlipCardLoan
          onClick={onClick}
          image={lineOfCreditSVG}
          imageBack={lineOfCreditWhiteSVG}
          title={"Hybrid card"}
          subtitle={
            "Hybrid card are revoling credit lines that can be used repeatedly for everyday purchases or emergencies in either the full  limit amount or in smaller increments."
          }
          subtitleSecond={
            "Ex: operations, funding recievables or inventory, repairs & maintenance, purchases, emergencies... Read more"
          }
        />
      </div>
    </div>
  );
};

export default LoanSubProductsView;
