import React from "react";
import { IAccountOrProductCardsBack } from "./types";
import checkSVG from "./img/check.svg";
const AccountOrProductCardsBack = ({
  title,
  subtitle,
  image,
}: IAccountOrProductCardsBack) => (
  <div className="rounded-lg p-3 border border-blueDarker cursor-pointer bg-blueLighter min-w-[249px]">
    <img src={checkSVG} alt={checkSVG} className="ml-auto" />
    <div className="flex min-h-[76px] rounded-2xl py-auto flex">
      <img src={image} alt="image" className="m-auto w-16 h-16" />
    </div>
    <p className="font-bold text-xl text-white mb-1 font-inter mt-5">{title}</p>
    <p className="text-sm text-white font-inter font-normal mb-5 mt-[43px]">
      {subtitle}
    </p>
  </div>
);

export default AccountOrProductCardsBack;
