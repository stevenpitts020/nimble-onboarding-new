import React from "react";
import SideMenuItem from "./SideMenuItem";
import { IStepTermsAndConditions } from "./types";
import SIDE_MENU_DISCLOSURES from "./SIDE_MENU_DISCLOSURES";

const SideMenu = ({
  activeDisclosure,
  setActiveDisclosure,
}: IStepTermsAndConditions) => {
  return (
    <div className="min-w-[255px]">
      {SIDE_MENU_DISCLOSURES.map((disclosure) => (
        <SideMenuItem
          key={disclosure.id}
          disclosure={disclosure}
          isActive={disclosure.id === activeDisclosure}
          setIsActive={() => setActiveDisclosure(disclosure.id)}
        />
      ))}
    </div>
  );
};

export default SideMenu;
