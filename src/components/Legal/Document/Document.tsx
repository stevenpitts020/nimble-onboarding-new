import React from "react";
import clsx from "clsx";
import "./Document.sass";
import { ILegalDocument } from "./types";

const Document: React.FC<ILegalDocument> = ({ children, classNameProps }) => (
  <div
    className={clsx(
      "bg-white rounded-2xl flex flex-col p-8 pb-0 doc_wrapper",
      classNameProps
    )}
  >
    {children}
  </div>
);
export default Document;
