import React, { useState } from "react";
import { IAccountOrProductCards } from "./types";
import { ReactComponent as LockOpen } from "./img/lockOpen.svg";
import { ReactComponent as LockClosed } from "./img/lockClosed.svg";
import ReactSwitch from "react-switch";

const AccountOrProductCards = ({
  title,
  subtitle,
  renderIcon,
  onClick,
  isSwitch,
  isMouseOnToggle,
  setIsMouseOnToggle,
}: IAccountOrProductCards) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div
      onClick={!isMouseOnToggle ? onClick : () => {}}
      className="rounded-lg border border-neutral30 shadow-card min-w-[270px] h-[400px] group-hover:bg-blueLighter cursor-pointer group"
    >
      <div className="flex rounded-2xl flex">
        <div className="mt-[28px] mx-auto mb-[25px] flex bg-neutral20 min-w-[220px] min-h-[160px] text-center text-darkerBlue group-hover:bg-darkerBlueSecond rounded-xl  group-hover:text-white">
          <div className={"m-auto"}>{renderIcon()}</div>
        </div>
      </div>
      <div className="max-w-[220px] mx-auto">
        <p className="font-bold text-xl text-neutral100 group-hover:text-white mb-1 font-inter">
          {title}
        </p>
        <p className="text-sm text-neutral60 group-hover:text-white font-inter font-normal mt-1 ">
          {subtitle}
        </p>
        <div className={"absolute bottom-4 mt-3.5 "}>
          {isSwitch && (
            <div
              className="flex m-auto  py-2 bottom-0  flex bg-zirkonSecond min-w-[220px] text-center text-darkerBlue group-hover:bg-white rounded-xl  group-hover:text-white"
              onMouseEnter={() => {
                if (setIsMouseOnToggle) {
                  setIsMouseOnToggle(true);
                }
              }}
              onMouseLeave={() => {
                if (setIsMouseOnToggle) {
                  setIsMouseOnToggle(false);
                }
              }}
            >
              <div>
                <LockOpen
                  className={
                    "text-slateGrayThird group-hover:text-blueDarkerSecond ml-2"
                  }
                />
              </div>

              <p className="ml-0.5 text-sm text-slateGrayThird group-hover:text-blueDarkerSecond font-inter font-normal">
                Unsecured
              </p>
              <div className="px-1">
                <ReactSwitch
                  checked={toggle}
                  onChange={() => {
                    setToggle(!toggle);
                  }}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  offColor="#FFFFFF"
                  onColor={"#4B7DF2"}
                  onHandleColor={"#FFFFFF"}
                  offHandleColor={"#4B7DF2"}
                  width={30}
                  height={19}
                  handleDiameter={17}
                />
              </div>
              <div>
                <LockClosed
                  className={
                    "text-slateGrayThird group-hover:text-blueDarkerSecond ml-2"
                  }
                />
              </div>

              <p className="ml-0.5 text-sm  text-slateGrayThird group-hover:text-blueDarkerSecond font-inter font-normal">
                Secured
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountOrProductCards;
