import React from "react";
import { ISideBarMenuSubItem } from "./types";
import { ReactComponent as Doing } from "./icons/doing.svg";
import { ReactComponent as Done } from "./icons/done.svg";
import clsx from "clsx";

const ACTIVE_COLOR = "#097B40";
const DEFAULT_COLOR = "#677489";

const SideBarMenuSubItem: React.FC<ISideBarMenuSubItem> = ({
  label,
  isOpen,
  subItems,
  level = 1,
  Icon,
  index,
  onClick,
  activeIndex,
  iconClass,
  isLastElement,
}) => {
  const isActive = index.join() === activeIndex.join();
  const isDone = index.join() < activeIndex.join();
  const localIsOpen = isOpen || (isDone && subItems?.length);

  const getCheckboxFromState = () => {
    if (subItems?.length) return null;
    const stateClassName = clsx("ni-sidebar-sub-element-state", {
      active: isActive,
    });
    return isDone ? (
      <Done className={stateClassName} />
    ) : (
      <Doing className={stateClassName} />
    );
  };

  const color = isActive || isDone ? ACTIVE_COLOR : DEFAULT_COLOR;
  return (
    <>
      <li
        data-testid="SideBarMenuSubItem"
        className={clsx("flex flex-col", { "bg-neutral20": localIsOpen })}
      >
        <button
          className="ni-sidebar-sub-element flex flex-row"
          // onClick={() => onClick(index)}
        >
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getCheckboxFromState()}
                {Icon && (
                  <div className={iconClass}>
                    <Icon stroke={color} />
                  </div>
                )}
                <span
                  className="ml-[19px] text-14/120% font-bold"
                  style={{ color }}
                >
                  {label}
                </span>
              </div>
            </div>
          </div>
        </button>
        {!isLastElement && (
          <span
            className={clsx("ni-sidebar-sub-mask", { done: isDone })}
          ></span>
        )}
      </li>

      {localIsOpen && subItems?.length && (
        <ul>
          {subItems.map(({ label, isOpen, subItems, Icon }, currentIndex) => (
            <SideBarMenuSubItem
              key={label}
              label={label}
              isOpen={isOpen}
              Icon={Icon}
              subItems={subItems}
              onClick={onClick}
              level={level + 1}
              index={[...index, currentIndex]}
              activeIndex={activeIndex}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SideBarMenuSubItem;
