import React from "react";
import { ISideMenuItem } from "./types";
import bookmarkIcon from "./bookmark.svg";
import bookmarkActiveIcon from "./bookmark-active.svg";
import clsx from "clsx";

const SideMenuItem = ({ disclosure, isActive, setIsActive }: ISideMenuItem) => {
  const { title, subtitle } = disclosure;

  return (
    <div
      className={clsx(
        "flex items-start w-full h-24 p-4 mb-3 rounded-2xl cursor-pointer",
        isActive ? "bg-blueCrayola" : "bg-white"
      )}
      onClick={setIsActive}
    >
      <div>
        <img
          src={isActive ? bookmarkActiveIcon : bookmarkIcon}
          width={33}
          height={39}
          alt="bookmark icon"
        />
      </div>
      <div className="ml-4">
        <h1
          className={`mb-1 font-semibold
            text-${isActive ? "white" : "xiketic"}`}
        >
          {title}
        </h1>
        <p
          className={clsx(
            "subtitle text-sm font-inter",
            isActive ? "text-white" : "text-slateGray"
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SideMenuItem;
