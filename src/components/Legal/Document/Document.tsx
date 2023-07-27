import React from "react";
import "./Document.sass";
import { ILegalDocument } from "./types";

const Document: React.FC<ILegalDocument> = ({ children }) => (
  <div className="doc_wrapper">{children}</div>
);
export default Document;
