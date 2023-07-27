import React from "react";
import CardLoan from "./CardLoan";
import CardLoanBack from "./CardLoanBack";
import clsx from "clsx";
import { IFlipCardLoan } from "../types";

const FlipCardLoan = ({
  onClick,
  image,
  title,
  subtitle,
  subtitleSecond,
  imageBack,
}: IFlipCardLoan) => {
  return (
    <section className="flex justify-center items-center">
      <div className="w-full h-full bg-transparent cursor-pointer group perspective">
        <div className="relative grid grid-rows grid-cols preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div className="backface-hidden w-full h-full my-rotate-y-0 text-center">
            <CardLoan
              title={title}
              subtitle={subtitle}
              subtitleSecond={subtitleSecond}
              image={image}
            />
          </div>
          <div
            className={clsx(
              "my-rotate-y-180 backface-hidden w-full h-full absolute"
            )}
          >
            <CardLoanBack
              title={title}
              subtitle={subtitle}
              image={imageBack}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlipCardLoan;
