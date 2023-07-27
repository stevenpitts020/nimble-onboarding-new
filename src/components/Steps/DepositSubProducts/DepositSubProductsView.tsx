import React from "react";
import CheckingCards from "./components/CheckingCards";
import simpleCheckingSVG from "./components/simpleCheckingIcon.svg";
import platinumCheckSVG from "./components/platinumCheckingIcon.svg";
import chamrockCheckingSVG from "./components/chamrockCheckingIcon.svg";
import clsx from "clsx";

const DepositSubProductsView = ({ isActive, setIsActive }) => (
  <div className="font-inter">
    <div className={"pt-[32px] pb-[36px]"}>
      <h1 className="font-bold text-24/36 text-neutral100 text-center group-hover:text-white">
        Choose sub-product type(s)
      </h1>
      <p className="mt-2 text-base text-neutral60 text-center group-hover:text-white">
        Choose from the following deposit sub-products:
      </p>
    </div>
    <div className="max-w-[512px]">
      <div className={"grid grid-cols-2 content-center"}>
        <button
          className={clsx(
            "text-center text-neutral60 font-bold  py-6 border-b  outline-0",
            isActive === "Checking" &&
              "text-main-accent border-b-2 border-b-lighterBlue"
          )}
          onClick={() => setIsActive("Checking")}
        >
          Checking Account
        </button>
        <button
          className={clsx(
            "text-center text-neutral60 font-bold  py-6 border-b  outline-0",
            isActive === "Savings" &&
              "text-main-accent border-b-2 border-b-lighterBlue"
          )}
          onClick={() => setIsActive("Savings")}
        >
          Savings Account
        </button>
      </div>
      <CheckingCards
        icon={simpleCheckingSVG}
        title={isActive === "Savings" ? "Simple Savings" : "Simple Checking"}
        subtitle="Financing the purchase of a building, shop, office space, or other commercial property"
        subItems={[
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        ]}
      />
      <CheckingCards
        icon={chamrockCheckingSVG}
        title={
          isActive === "Savings" ? "Shamrock Savings" : "Shamrock Checking"
        }
        subtitle="For business owners who want a cash cushion for cash flow gaps or emergencies"
        subItems={[
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        ]}
      />
      <CheckingCards
        icon={platinumCheckSVG}
        title={
          isActive === "Savings" ? "Platinum Savings" : "Platinum Checking"
        }
        subtitle="Whether you are building a new facility, refinancing an existing building or purchasing new equipment"
        subItems={[
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        ]}
      />
    </div>
  </div>
);

export default DepositSubProductsView;
