import React from "react";
import homeSVG from "./homeIcon.svg";
import { IHeaderBusinessEin } from "./types";

const HeaderBusinessEin = ({ text }: IHeaderBusinessEin) => (
  <>
    <img src={homeSVG} alt={homeSVG} className="mx-auto" />
    <h1 className="text-2xl mx-auto text-center font-bold mt-[18px]">{text}</h1>
  </>
);

export default HeaderBusinessEin;
