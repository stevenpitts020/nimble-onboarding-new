import React, { useState } from "react";
import { ICardsLoanBack } from "../types";
import lockOpenWhiteSVG from "./lockOpenWhite.svg";
import lockClosedWhiteSVG from "./lockCloseWhite.svg";
import ReactSwitch from "react-switch";
import checkSVG from "./check.svg";
const CardLoanBack = ({ title, subtitle, image, onClick }: ICardsLoanBack) => {
  const [toggle, setToggle] = useState(false);
  const [isMouseOnToggle, setIsMouseOnToggle] = useState(false);
  return (
    <button
      onClick={!isMouseOnToggle ? onClick : () => {}}
      className="rounded-lg p-3 border border-blueDarker relative group cursor-pointer w-full h-full font-inter text-center font-inter bg-darkerBlue flex flex-col justify-between items-center"
    >
      <img src={checkSVG} alt={checkSVG} className="ml-auto" />
      <div className="mt-1 rounded-2xl py-auto flex">
        <img src={image} alt="image" className="m-auto" />
      </div>
      <p className=" text-center font-bold text-base text-neutral100 mb-1 font-inter mt-5 text-white">
        {title}
      </p>
      <p className=" font-normal mt-3 mb-5 text-darkGraySecond text-center text-lightestBlue">
        {subtitle}
      </p>
      <div className="bg-lightBlue rounded-lg flex h-[100px] w-full">
        <div className="flex m-auto">
          <div>
            <img src={lockOpenWhiteSVG} alt={lockOpenWhiteSVG} />
          </div>

          <p className="ml-2 text-neutral60 font-sm font-inter text-white text-sm">
            Unsecured
          </p>
          <div
            className="px-2"
            onMouseEnter={() => {
              setIsMouseOnToggle(true);
            }}
            onMouseLeave={() => {
              setIsMouseOnToggle(false);
            }}
          >
            <ReactSwitch
              checked={toggle}
              onChange={() => {
                setToggle(!toggle);
              }}
              checkedIcon={false}
              uncheckedIcon={false}
              offColor={"#111729"}
              onColor={"#4B7DF2"}
              width={30}
              height={19}
              handleDiameter={17}
            />
          </div>
          <div>
            <img src={lockClosedWhiteSVG} alt={lockClosedWhiteSVG} />
          </div>

          <p className="ml-2 text-neutral60 font-medium font-inter text-white text-sm">
            Secured
          </p>
        </div>
      </div>
    </button>
  );
};

export default CardLoanBack;
