import React, { useState } from "react";
import { ChevronRight } from "react-feather";
import clsx from "clsx";
import { IFaq } from "./types";

const Faq = ({ label, subItems, position }: IFaq) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div key={position} className="ni-sidebar-faq">
      {position === 0 && (
        <>
          <hr className=" text-lighterGray" />
          <button className="bg-green mt-6 text-white font-inter text-xs py-[3px] px-2.5 rounded-2xl">
            Frequently Asked Questions
          </button>
        </>
      )}
      <div
        className={clsx(
          "flex justify-between items-center w-full",
          position === 0 ? "mt-[12px]" : "mt-[24px]"
        )}
      >
        <p className="font-inter font-bold text-neutral100 text-base">
          {label}
        </p>
        <button onClick={() => setIsOpen(!isOpen)} className="my-4">
          <ChevronRight className={clsx({ "rotate-90": isOpen })} />
        </button>
      </div>
      {isOpen && subItems?.length && (
        <ul>
          {subItems.map(({ label, listItem }, currentIndex) => (
            <p
              key={currentIndex}
              className={clsx(
                "font-inter text-neutral100 text-sm",
                listItem ? "my-3" : "mb-6"
              )}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          ))}
        </ul>
      )}
      <hr className=" text-lighterGray" />
    </div>
  );
};

export default Faq;
