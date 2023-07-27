import React from "react";
import clsx from "clsx";
import SideBarMenuItem from "./SideBarMenuItem";
import { iSideBarMenu } from "./types";
import useSideBarMenu from "./useSideBarMenu";
import InfoBlock from "./InfoBlock";
import Faq from "./Faq";
import "./SideBarMenu.sass";

const SideBarMenu: React.FC<iSideBarMenu> = ({ classNames, showTips }) => {
  const { menu, activeIndex, faq } = useSideBarMenu();

  return (
    <>
      <ul
        data-testid="SideBarMenu"
        className={clsx("ni-sidebar-menu", classNames)}
      >
        {menu.map(({ label, Icon, subItems }, currentIndex) => (
          <SideBarMenuItem
            activeIndex={activeIndex}
            key={label}
            label={label}
            index={[currentIndex]}
            // onClick={onClickItem}
            Icon={Icon}
            subItems={subItems}
          />
        ))}
        {showTips && <InfoBlock />}
        {faq &&
          faq.map(({ label, subItems }, currentIndex) => (
            <Faq
              key={currentIndex}
              position={currentIndex}
              label={label}
              subItems={subItems}
            />
          ))}
      </ul>
    </>
  );
};

export default SideBarMenu;
