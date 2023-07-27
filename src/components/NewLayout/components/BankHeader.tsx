import React, { useContext } from "react";
import { HelpCircle } from "react-feather";
import Logo from "../../Header/Logo/Logo";
import { InstitutionContext } from "../../../store";

const BankHeader: React.FC = () => {
  const institution = useContext(InstitutionContext);

  return (
    <header className="flex flex-1 justify-between pt-4 px-20">
      <div>
        <Logo
          url={institution?.logoUri?.default || ""}
          alt={`${institution?.name} logo`}
          width={"195px"}
        />
      </div>
      <div className="text-neutral60 flex">
        <HelpCircle className="mr-2" />
        Need Help?
      </div>
    </header>
  );
};

export default BankHeader;
