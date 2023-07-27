import React, { useState } from "react";
import { ICardsApplying } from "./types";

const CardsApplying = ({
  image,
  imageSecond,
  title,
  subtitle,
}: ICardsApplying) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="rounded-lg p-3 border group hover:bg-darkerBlue border-neutral30 hover:border-darkerBlue relative group cursor-pointer min-w-[288px] min-h-[300px] flex flex-col justify-center text-center shadow-card"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="rounded-2xl ">
        <img
          src={isHover ? imageSecond : image}
          alt="image"
          className="m-auto"
        />
      </div>
      <p className="font-bold text-xl text-neutral100 mb-1 font-inter mt-5 group-hover:text-white">
        {title}
      </p>
      <p className="text-sm text-neutral60 font-inter font-normal mb-5 group-hover:text-white">
        {subtitle}
      </p>
    </div>
  );
};

export default CardsApplying;
