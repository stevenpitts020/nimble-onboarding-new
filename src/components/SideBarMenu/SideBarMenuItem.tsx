import React from "react";
import clsx from "clsx";
import { ISideBarMenuItem } from "./types";
import SideBarMenuSubItem from "./SideBarMenuSubItem";

const SideBarMenuItem: React.FC<ISideBarMenuItem> = ({
  Icon,
  label,
  subItems,
  index,
  activeIndex,
}) => {
  const [topMenuIndex] = index;
  const [activeTopMenuIndex, activeSubindex] = activeIndex;
  const isOpenTop = topMenuIndex === activeTopMenuIndex;
  const isOpen = !!(activeSubindex + 1);
  const isDone = topMenuIndex < activeTopMenuIndex;
  const lengthSubitem = Number(subItems?.length) - 1;
  return (
    <li className="ni-sidebar-menu-top-item">
      <button
        disabled
        // onClick={() => onClick(index)}
        className={clsx(
          "ni-sidebar-top-element flex py-[21px] w-full justify-between items-center",
          {
            "text-greenDarker open-item": isOpenTop,
          }
        )}
      >
        <div className="flex items-center justify-center">
          <span
            className={clsx("ni-sidebar-menu-top-item-icon", {
              "done-step": isOpenTop || isDone,
            })}
          >
            {Icon && <Icon />}
          </span>
          <span
            className={clsx("mx-3 text-neutral60 font-medium", {
              "text-greenDarker": isOpenTop || isDone,
            })}
          >
            {label}
          </span>
        </div>
      </button>

      <ul className="border-b mx-[37px] border-lighterGray min-h-[1px]">
        {!!subItems?.length &&
          isOpen &&
          subItems.map(
            ({ label, isOpen, Icon, subItems, iconClass }, currentIndex) => (
              <SideBarMenuSubItem
                key={label}
                isLastElement={lengthSubitem === currentIndex}
                label={label}
                isOpen={isOpen}
                iconClass={iconClass}
                Icon={Icon}
                subItems={subItems}
                index={[...index, currentIndex]}
                // onClick={onClick}
                activeIndex={activeIndex}
              />
            )
          )}
      </ul>
    </li>
  );
};

export default SideBarMenuItem;
