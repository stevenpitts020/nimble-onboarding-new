import React, { useState } from "react";
import { ICheckingCards } from "../types";
import { ChevronRight } from "react-feather";
import clsx from "clsx";

const CheckingCards = ({ icon, title, subtitle, subItems }: ICheckingCards) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hover:bg-darkerBlue group rounded-lg shadow-card">
      <div className="mt-4 p-4 flex">
        <img src={icon} alt={icon} />
        <div className="mx-4">
          <p className="text-neutral100 group-hover:text-white font-bold">
            {title}
          </p>
          <p className="text-sm text-neutral60 group-hover:text-white">
            {subtitle}
          </p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="mt-4">
          <ChevronRight
            className={clsx("transform transition duration-500 ease-in-out", {
              "rotate-90": isOpen,
            })}
          />
        </button>
      </div>
      {isOpen && subItems?.length && (
        <div>
          {subItems.map((label, currentIndex) => (
            <p
              key={currentIndex}
              className="text-sm text-neutral60 group-hover:text-white ml-6 pb-6"
            >
              {label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckingCards;
