import React from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import { ReactComponent as DriverLicense } from "./img/driverLicense.svg";
import { ReactComponent as Id } from "./img/id.svg";
import { ReactComponent as Passport } from "./img/passport.svg";
import { ReactComponent as Visa } from "./img/visa.svg";
import Checkbox from "../../Forms/Checkbox/Checkbox";
import { IStepSelectDocumentView } from "./types";
import clsx from "clsx";

const documents = [
  {
    Img: DriverLicense,
    label: "Driver license",
    name: "Driver license",
  },
  {
    Img: Id,
    label: "State-Issued ID",
    name: "ID",
  },
  {
    Img: Passport,
    label: "Passport",
    name: "PASSPORT",
  },
  {
    Img: Visa,
    label: "Legal Residency Card (VISA)",
    name: "VISA",
  },
];

const StepSelectDocumentView: React.FC<IStepSelectDocumentView> = ({
  onChooseDocument,
}) => (
  <Layout
    sidebarType={SIDEBAR_TYPE.NAVIGATION}
    hideHeader
    showTimer={false}
    hideNextButton
    classNameContainer="bg-white rounded-2xl m-8 text-center font-bold h-full flex justify-between flex-col"
  >
    <div>
      <h1 className="mt-16 text-4xl text-neutral100">
        Which document do you wish to use?
      </h1>
      <p className="text-placeholder mt-2 font-normal">
        Make sure that your document is readable and is <br />
        not physically damaged or expired
      </p>
    </div>
    <div className="mt-10 grid grid-cols-2 mb-14 mx-28 gap-8 auto-cols-min">
      {documents.map(({ Img, label, name }, index) => (
        <button
          key={name}
          className={clsx(
            "flex flex-1 flex-col items-center border border-main-accent rounded-xl pb-6 pt-10 relative w-[360px] h-[186px]",
            { "justify-self-end": !(index % 2) }
          )}
          onClick={() => onChooseDocument(name)}
        >
          <Checkbox
            id={name}
            name={name}
            onChange={() => onChooseDocument(name)}
            className="absolute right-3 top-3"
          />
          <Img />
          <p className="mt-6 font-semibold font-inter text-sm">{label}</p>
        </button>
      ))}
    </div>
    <div />
  </Layout>
);

export default StepSelectDocumentView;
