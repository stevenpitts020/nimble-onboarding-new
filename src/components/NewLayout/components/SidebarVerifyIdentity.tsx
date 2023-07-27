import React, { useContext } from "react";
import clsx from "clsx";
import Logo from "../../Header/Logo/Logo";
import { InstitutionContext } from "../../../store";
import { ReactComponent as Document } from "../img/document.svg";
import { ReactComponent as Dot } from "../img/dot.svg";
import LogoIcon from "../img/Logo.svg";
import { ISidebarVerifyIdentity } from "../types";

const steps = [
  {
    label: "Select Document",
  },
  {
    label: "Scan Front of ID",
  },
  {
    label: "Scan Back of ID",
  },
];

const SidebarVerifyIdentity: React.FC<ISidebarVerifyIdentity> = ({
  customText,
  className,
}) => {
  const institution = useContext(InstitutionContext);
  // TODO: - temp solution until we get domain name for new onboarding
  const logo = window.location.href.includes("feature-nim-135")
    ? LogoIcon
    : institution?.logoUri?.default;

  const LogoComponent: React.ReactNode = (
    <Logo
      url={logo || ""}
      alt={`${institution?.name} logo`}
      width="195px"
      className="ml-10 mt-4"
    />
  );

  if (customText) {
    return (
      <div
        className={clsx("h-full bg-white border-r border-neutral30", className)}
      >
        {LogoComponent}
        {customText}
      </div>
    );
  }

  return (
    <div className="h-full bg-white  shadow-sidebarComponent">
      {LogoComponent}
      <div className="pl-16 pr-12 mt-2 pt-20 ">
        <div className="flex flex-1 flex-col items-center pb-6 border-b border-neutral30 text-center">
          <Document />
          <h1 className="text-2xl font-bold mt-7 font-inter text-darkest">
            Verify Identity
          </h1>

          <p className="mt-2 w-64 text-placeholder font-inter text-sm">
            Elementum nec aenean at semper eros, habitasse nunc
          </p>
        </div>
        <ul className="mt-6">
          {steps.map(({ label }, index) => (
            <li key={label}>
              <div
                className={clsx(
                  "flex items-center  font-inter text-sm",
                  index === 0
                    ? "font-semibold text-darkest"
                    : "text-placeholder"
                )}
              >
                <Dot className="mr-4" />
                <span>{label}</span>
              </div>

              {steps.length - 1 !== index && (
                <div className="ml-[7px] my-1 border-l border-neutral30 h-5" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarVerifyIdentity;
