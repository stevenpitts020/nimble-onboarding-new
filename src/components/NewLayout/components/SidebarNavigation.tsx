import React from "react";
import { ISidebarNavigation } from "../types";
import ExitLogo from "../../Header/ExitLogo/ExitLogo";
import SideBarMenu from "../../SideBarMenu/SideBarMenu";

const SidebarNavigation: React.FC<ISidebarNavigation> = ({
  isHideSideBar,
  isHideLogo,
  showTips,
}) => {
  const logo = isHideLogo ? null : <ExitLogo className={"w-52 mt-4 ml-10"} />;
  if (isHideSideBar) {
    return <div className="absolute">{logo}</div>;
  }
  return (
    <div className="w-96 min-w-[360px] bg-white shadow-sidebarComponent">
      {logo}
      <SideBarMenu
        showTips={showTips}
        classNames={"mt-[62px] ni-sidebar-scrollable mr-[5px]"}
      />
    </div>
  );
};

export default SidebarNavigation;
