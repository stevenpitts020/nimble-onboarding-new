import React from "react";
import { ICardsLoan } from "../types";

const CardLoan = ({ title, subtitle, image, subtitleSecond }: ICardsLoan) => {
  return (
    <div className="rounded-lg p-3 border border-blueDarker relative group cursor-pointer h-full w-full font-inter text-center flex flex-col justify-between">
      <div className="mt-7 rounded-2xl flex">
        <img src={image} alt="image" className="m-auto" />
      </div>
      <p className=" text-center font-bold text-base text-neutral100 mb-1 font-inter mt-5 text-lightBlue">
        {title}
      </p>
      <p className="text-neutral60 font-inter font-normal mt-3 mb-5 text-darkGraySecond text-center">
        {subtitle}
      </p>
      <div className="bg-lightBlue rounded-lg flex h-[100px] p-3 text-sm mt-auto">
        {subtitleSecond.length > 95 ? (
          <p className="text-white font-inter block">
            {subtitleSecond.slice(0, 95)}
            <span className={"font-bold"}>... Read more</span>
          </p>
        ) : (
          <p className="text-white font-inter block">{subtitleSecond}</p>
        )}
      </div>
    </div>
  );
};

export default CardLoan;
