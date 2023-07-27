import React, { FC, useContext } from "react";
import clsx from "clsx";
import SideBarItem from "./SideBarItem";
import { ISideBar } from "./types";
import { IPersonalInfo } from "../../../store/PersonalInfo/types";
import { PersonalInfoContext } from "../../../store/PersonalInfo/PersonalInfoContext";
import "./ScanResult.sass";

const SideBar: FC<ISideBar> = ({ isShow }) => {
  const { personalInfo } = useContext<IPersonalInfo>(PersonalInfoContext);

  return (
    <div
      className={clsx("scan-result-sidebar", {
        isHidden: !isShow,
      })}
    >
      {personalInfo.map((item, idx) => {
        return <SideBarItem key={item.title} item={item} isFirst={idx === 0} />;
      })}
    </div>
  );
};

export default SideBar;
