import React, { FC, useState, useEffect, useRef, useContext } from "react";
import clsx from "clsx";
import { ISideBarItem } from "./types";
import { IPersonalInfo } from "../../../store/PersonalInfo/types";
import { PersonalInfoContext } from "../../../store/PersonalInfo/PersonalInfoContext";
import "./ScanResult.sass";
import InputLocation from "../../Forms/InputLocation/InputLocation";

const SideBarItem: FC<ISideBarItem> = ({ item, isFirst }) => {
  const [isOpen, setIsOpen] = useState(isFirst || false);

  const { onChangePersonalDetailsHandler } =
    useContext<IPersonalInfo>(PersonalInfoContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeElement = () => {
      if (ref.current) {
        ref.current.style.maxHeight = `${ref.current.scrollHeight + 30}px`;
      }
    };
    if (ref.current) {
      if (isOpen) {
        resizeElement();
        window.addEventListener("resize", resizeElement);
      } else {
        ref.current.style.maxHeight = "0";
      }
    }
    return () => {
      if (isOpen) {
        window.removeEventListener("resize", resizeElement);
      }
    };
  }, [isOpen, ref]);

  return (
    <>
      <div
        className="flex items-center bg-perano rounded-xl h-[46px] w-full mb-[10px] px-[14px] z-50 cursor-pointer mt-[30px]"
        onClick={() => void setIsOpen((prevValue) => !prevValue)}
      >
        <div className="flex w-full justify-between font-inter text-15 text-darkBlue font-bold">
          <div>{item.title}</div>
          <div className="text-right">{`>`}</div>
        </div>
      </div>
      <div
        ref={ref}
        className={clsx("sidebar-item", {
          "hide-sideBar": !isOpen,
        })}
      >
        {item.data.map((item, idx) => {
          if (item.key === "ADDRESS") {
            return (
              <InputLocation
                key={item.key}
                className="mt-4"
                value={item.value}
                onChange={(newValue) =>
                  onChangePersonalDetailsHandler(item.key, newValue || "")
                }
              />
            );
          }
          return (
            <div
              key={item.key}
              className={clsx(
                "flex flex-col border-b-2 border-grayInfo mt-12",
                {
                  "mt-[25px]": idx === 0,
                }
              )}
            >
              <label
                htmlFor={item.key}
                className="font-lato text-grayInfo font-black text-10 uppercase"
              >
                {item.label}
              </label>
              <input
                type="text"
                disabled={item.disabled}
                className="h-10 focus:outline-none text-darkBlue font-lato font-black text-lg mt-3"
                name={item.key}
                value={item.value}
                onChange={({ target }) => {
                  onChangePersonalDetailsHandler(item.key, target.value);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SideBarItem;
