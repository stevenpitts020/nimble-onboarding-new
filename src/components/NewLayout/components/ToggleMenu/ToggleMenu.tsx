import React from "react";
import clsx from "clsx";
import { IToggleMenu } from "./types";
import "./ToggleMenu.sass";
import { ReactComponent as IconClose } from "./img/Cross.svg";

const ToggleMenu: React.FC<IToggleMenu> = ({
  open,
  className,
  children,
  menuPosition,
  toggleMenu,
}) => {
  return (
    <div
      className={clsx("ni-toggle-menu shadow-sidebarComponent", [
        open && "open-menu",
        className,
        menuPosition,
      ])}
    >
      <div className="ni-toggle-menu-content">
        <div className="ni-toggle-menu-close">
          <IconClose onClick={toggleMenu} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ToggleMenu;
